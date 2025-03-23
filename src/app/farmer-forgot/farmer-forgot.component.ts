import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-farmer-forgot',
  standalone:true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
  ],
  templateUrl: './farmer-forgot.component.html',
  styleUrl: './farmer-forgot.component.scss'
})
export class FarmerForgotComponent {
  formData = {
    Email: ''
  };

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  handlePasswordReset(event: Event) {
    event.preventDefault();

    // Basic Validation
    if (!this.formData.Email) {
      this.openSnackbar('Email address is required.', 'error');
      return;
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
