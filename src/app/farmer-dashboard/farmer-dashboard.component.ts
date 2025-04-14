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
  styleUrls: ['./farmer-dashboard.component.scss']
})
export class FarmerDashboardComponent implements OnInit {
  farmerName: string = '';
  coinBalance: number = 0.0;
  walletBalance: number = 0.0;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchFarmerData();
  }

  fetchFarmerData() {
    const storedName = localStorage.getItem('farmer_name');

    if (storedName) {
      this.farmerName = storedName;
      this.getCoinBalance();
      this.getWalletBalance();
    } else {
      this.farmerName = 'Unknown Farmer';
      this.openSnackbar('Farmer information missing. Please log in.', 'error');
      this.router.navigate(['/farmer/login']);
    }
  }

  getCoinBalance() {
    const apiUrl = `https://michaelotienokasuku.pythonanywhere.com/get-coin-balance/?username=${this.farmerName}`;
    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        this.coinBalance = response.coin_balance || 0.0;
      },
      (error) => {
        this.openSnackbar('Failed to fetch coin balance.', 'error');
        console.error('Error fetching coin balance:', error);
      }
    );
  }

  getWalletBalance() {
    const apiUrl = `https://michaelotienokasuku.pythonanywhere.com/get-wallet-balance/?username=${this.farmerName}`;
    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        this.walletBalance = response.wallet_balance || 0.0;
      },
      (error) => {
        this.openSnackbar('Failed to fetch wallet balance.', 'error');
        console.error('Error fetching wallet balance:', error);
      }
    );
  }

  logout(event?: Event): void {
    if (event) event.preventDefault();

    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      localStorage.removeItem('farmer_name');
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
