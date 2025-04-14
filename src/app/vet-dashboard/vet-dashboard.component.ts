import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vet-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
  ],
  templateUrl: './vet-dashboard.component.html',
  styleUrl: './vet-dashboard.component.scss'
})
export class VetDashboardComponent implements OnInit {

  vetName: string = '';
  coinBalance: number = 0.0;
  walletBalance: number = 0.0;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchVetData();
  }

  fetchVetData() {
    const storedName = localStorage.getItem('vet_name');

    if (storedName) {
      this.vetName = storedName;
      this.getCoinBalance();
      this.getWalletBalance();
    } else {
      this.vetName = 'Unknown Vet';
      this.openSnackbar('Vet information missing. Please log in.', 'error');
      this.router.navigate(['/vet/login']);
    }
  }

  getCoinBalance() {
    const apiUrl = `https://michaelotienokasuku.pythonanywhere.com/get-coin-balance/?username=${this.vetName}`;
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
    const apiUrl = `https://michaelotienokasuku.pythonanywhere.com/get-wallet-balance/?username=${this.vetName}`;
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
      localStorage.removeItem('vet_name');
      this.router.navigate(['/vet/login']);
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
