import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vet-reward',
  standalone:true,
  imports: [CommonModule, MatSnackBarModule, FormsModule],
  templateUrl: './vet-reward.component.html',
  styleUrl: './vet-reward.component.scss'
})
export class VetRewardComponent implements OnInit{
  vetName: string = '';
  coinBalance: number = 0.0;
  walletBalance: number = 0.0;
  coinAmount: number = 0;

  dialogVisible: boolean = false;
  dialogType: 'deposit' | 'withdraw' = 'deposit';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchFarmerData();
  }

  fetchFarmerData() {
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

  depositCoins() {
    const apiUrl = 'https://michaelotienokasuku.pythonanywhere.com/deposit-coins/';
    const payload = {
      username: this.vetName,
      coins: this.coinAmount
    };

    this.http.post<any>(apiUrl, payload).subscribe(
      (response) => {
        this.openSnackbar(response.message, 'success');
        this.coinBalance = response.new_coin_balance;
        this.walletBalance = response.new_wallet_balance;
        this.coinAmount = 0;
      },
      (error) => {
        this.openSnackbar(error.error?.error || 'Failed to deposit coins.', 'error');
        console.error('Deposit error:', error);
      }
    );
  }

  withdrawCoins() {
    const apiUrl = 'https://michaelotienokasuku.pythonanywhere.com/withdraw-coins/';
    const payload = {
      username: this.vetName,
      coins: this.coinAmount
    };

    this.http.post<any>(apiUrl, payload).subscribe(
      (response) => {
        this.openSnackbar(response.message, 'success');
        this.coinBalance = response.new_coin_balance;
        this.walletBalance = response.new_wallet_balance;
        this.coinAmount = 0;
      },
      (error) => {
        this.openSnackbar(error.error?.error || 'Failed to withdraw coins.', 'error');
        console.error('Withdraw error:', error);
      }
    );
  }

  openSnackbar(message: string, severity: 'success' | 'error') {
    const snackBarClass = severity === 'success' ? 'snackbar-success' : 'snackbar-error';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: snackBarClass,
    });
  }

  showDialog(type: 'deposit' | 'withdraw') {
    if (this.coinAmount <= 0) {
      this.openSnackbar('Please enter a valid coin amount.', 'error');
      return;
    }
    this.dialogType = type;
    this.dialogVisible = true;
  }

  closeDialog() {
    this.dialogVisible = false;
  }

  confirmAction() {
    if (this.dialogType === 'deposit') {
      this.depositCoins();
    } else {
      this.withdrawCoins();
    }
    this.closeDialog();
  }
}
