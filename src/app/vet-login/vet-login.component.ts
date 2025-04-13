import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vet-login',
  standalone:true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule
  ],
  templateUrl: './vet-login.component.html',
  styleUrl: './vet-login.component.scss'
})
export class VetLoginComponent {
  formData = {
    Username: '',
    Password: '',
  };

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router
  ) {}

  handleLogin() {
    if (!this.formData.Username || !this.formData.Password) {
      this.openSnackbar('Both fields are required.', 'error');
      return;
    }

    const payload = {
      username: this.formData.Username,
      password: this.formData.Password
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>('http://127.0.0.1:8000/vet-login/', payload, { headers }).subscribe({
      next: (response) => {
        // Save vet info in local storage
        localStorage.setItem('vet_name', response.user.username);

        this.openSnackbar('Login successful!', 'success');

        // Redirect to dashboard
        this.router.navigate(['/vet/dashboard']);
      },
      error: (err) => {
        const errorMsg = err.error?.error || 'Login failed. Please try again.';
        this.openSnackbar(errorMsg, 'error');
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
}
