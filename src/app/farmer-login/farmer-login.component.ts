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
  selector: 'app-farmer-login',
  standalone: true,
  templateUrl: './farmer-login.component.html',
  styleUrls: ['./farmer-login.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule
  ]
})
export class FarmerLoginComponent {
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
  
    this.http.post<any>('https://michaelotienokasuku.pythonanywhere.com/farmer-login/', payload, { headers }).subscribe({
      next: (response) => {
        localStorage.setItem('farmer_name', response.user.username);
  
        this.openSnackbar('Login successful!', 'success');
  
        // Redirect to dashboard
        this.router.navigate(['/farmer/dashboard']);
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
