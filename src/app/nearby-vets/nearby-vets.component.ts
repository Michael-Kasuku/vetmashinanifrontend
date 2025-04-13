import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nearby-vets',
  imports: [
    CommonModule,
    MatSnackBarModule,
    FormsModule
  ],
  templateUrl: './nearby-vets.component.html',
  styleUrl: './nearby-vets.component.scss'
})
export class NearbyVetsComponent {
  farmerName: string = '';
  nearbyVets: { username: string; distance_km: number }[] = [];

  showDialog: boolean = false;  // Controls dialog visibility
  selectedVet: string = '';     // Holds selected vet for booking
  appointmentDescription: string = '';  // Holds the appointment description input

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedName = localStorage.getItem('farmer_name');

    if (storedName) {
      this.farmerName = storedName;
      this.loadNearbyVets();
    } else {
      this.farmerName = 'Unknown Farmer';
      this.openSnackbar('Farmer information missing. Please log in.', 'error');
      this.router.navigate(['/farmer/login']);
    }
  }

  loadNearbyVets(): void {
    const url = `http://127.0.0.1:8000/nearby-vets/?username=${this.farmerName}`;
    this.http.get<any[]>(url).subscribe({
      next: (response) => {
        this.nearbyVets = response.map(vet => ({
          username: vet.username,
          distance_km: vet.distance_km
        }));
      },
      error: (error) => {
        console.error('Error fetching nearby vets:', error);
        this.openSnackbar('Failed to load nearby vets.', 'error');
      }
    });
  }  

  bookAppointment(vet: string): void {
    this.selectedVet = vet;  // Set the selected vet
    this.showDialog = true;   // Show the dialog
  }  

  closeDialog(): void {
    this.showDialog = false;  // Hide the dialog
  }

  confirmAppointment(): void {
    if (this.appointmentDescription.trim() === '') {
      this.openSnackbar('Please enter a description for the appointment.', 'error');
      return;
    }
  
    const appointmentPayload = {
      farmer_username: this.farmerName,
      vet_username: this.selectedVet,
      farmer_note: this.appointmentDescription
    };
  
    this.http.post('http://127.0.0.1:8000/appointments/', appointmentPayload).subscribe({
      next: () => {
        this.openSnackbar(`Appointment successfully booked with ${this.selectedVet}!`, 'success');
        this.closeDialog();
      },
      error: (error) => {
        console.error('Failed to book appointment:', error);
        this.openSnackbar('Failed to book appointment. Please try again later.', 'error');
      }
    });
  }  

  addToFavorite(vetUsername: string): void {
    const payload = new URLSearchParams();
    payload.set('username', this.farmerName);
    payload.set('favorite_username', vetUsername);
  
    this.http.post('http://localhost:8000/add-favorite/', payload.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe({
      next: () => {
        this.openSnackbar(`${vetUsername} added to favorites!`, 'success');
      },
      error: (error) => {
        console.error('Failed to add favorite:', error);
        this.openSnackbar(`${vetUsername} is already added favorite!`, 'error');
      }
    });
  }  

  openSnackbar(message: string, severity: 'success' | 'error') {
    const snackBarClass = severity === 'success' ? 'snackbar-success' : 'snackbar-error';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: snackBarClass,
    });
  }

  closeSnackbar() {
    this.snackBar.dismiss();
  }
}
