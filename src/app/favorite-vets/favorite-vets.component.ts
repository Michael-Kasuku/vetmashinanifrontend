import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favorite-vets',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    FormsModule
  ],
  templateUrl: './favorite-vets.component.html',
  styleUrls: ['./favorite-vets.component.scss']
})
export class FavoriteVetsComponent implements OnInit {
  farmerName: string = '';
  favoriteVets: string[] = [];

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
      this.loadFavoriteVets();
    } else {
      this.farmerName = 'Unknown Farmer';
      this.openSnackbar('Farmer information missing. Please log in.', 'error');
      this.router.navigate(['/farmer/login']);
    }
  }

  loadFavoriteVets(): void {
    const url = `https://michaelotienokasuku.pythonanywhere.com/favorite-vets/?username=${this.farmerName}`;
    this.http.get<any[]>(url).subscribe({
      next: (response) => {
        this.favoriteVets = response.map(vet => vet.username);
      },
      error: (error) => {
        console.error('Error fetching favorite vets:', error);
        this.openSnackbar('Failed to load favorite vets.', 'error');
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
  
    this.http.post('https://michaelotienokasuku.pythonanywhere.com/appointments/', appointmentPayload).subscribe({
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
