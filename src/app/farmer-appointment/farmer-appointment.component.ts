import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-farmer-appointment',
  standalone:true,
  imports: [
    CommonModule,
    MatSnackBarModule,
  ],
  templateUrl: './farmer-appointment.component.html',
  styleUrl: './farmer-appointment.component.scss'
})
export class FarmerAppointmentComponent implements OnInit{
  farmerName: string = '';
  approvedAppointments: any[] = [];
  cancelledAppointments: any[] = [];
  pendingAppointments: any[] = [];

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchFarmerData();
    this.loadAppointments();
  }

  fetchFarmerData() {
    const storedName = localStorage.getItem('farmer_name');

    if (storedName) {
      this.farmerName = storedName;
    } else {
      this.farmerName = 'Unknown Farmer';
      this.openSnackbar('Farmer information missing. Please log in.', 'error');
      this.router.navigate(['/farmer/login']);
    }
  }

  loadAppointments(): void {
    this.http.get<any[]>(`https://michaelotienokasuku.pythonanywhere.com/appointments/?username=${this.farmerName}`)
      .pipe(
        catchError(err => {
          this.openSnackbar('Error loading appointments', 'error');
          throw err;
        })
      )
      .subscribe(data => {
        this.pendingAppointments = data.filter(n => n.status === 'pending');
        this.approvedAppointments = data.filter(n => n.status === 'approved');
        this.cancelledAppointments = data.filter(n => n.status === 'cancelled');
      });
  }  

  convertToEAT(utcTime: string): string {
    const date = new Date(utcTime);
    // Convert to EAT by adding 3 hours
    const eatTime = new Date(date.getTime() + 3 * 60 * 60 * 1000);
    return eatTime.toLocaleString('en-KE', {
      timeZone: 'Africa/Nairobi',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
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
