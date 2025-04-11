import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
  ],
  templateUrl: './farmer-dashboard.component.html',
  styleUrl: './farmer-dashboard.component.scss'
})
export class FarmerDashboardComponent implements OnInit {
  farmerName: string = '';
  upcomingAppointments: number = 0;
  coinsEarned: number = 0;
  walletBalance: number = 0.0;  // Replacing vetsRated with walletBalance

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchFarmerData();
  }

  fetchFarmerData() {
    const storedFarmer = localStorage.getItem('farmer');
    if (storedFarmer) {
      const farmer: { username: string } = JSON.parse(storedFarmer);
      this.farmerName = farmer.username || 'Unknown Farmer';
    } else {
      this.farmerName = 'Unknown Farmer';
      this.walletBalance = 0.0;
    }
  
    // Dummy values for other data
    this.upcomingAppointments = 3;
    this.coinsEarned = 150;
  }      

  logout(event?: Event): void {
    if (event) event.preventDefault();
  
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      localStorage.removeItem('farmer');
      this.router.navigate(['/farmer/login']);
    }
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
