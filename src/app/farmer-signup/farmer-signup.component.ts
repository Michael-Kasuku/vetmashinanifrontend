import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-farmer-signup',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    MatAutocompleteModule
  ],
  templateUrl: './farmer-signup.component.html',
  styleUrl: './farmer-signup.component.scss'
})
export class FarmerSignupComponent {
  formData = {
    Username: '',
    Location: '',
    Latitude: 0.0,
    Longitude: 0.0,
    Email: '',
    PasswordHash: '',
    ConfirmPassword: '',
  };

  locationOptions: { name: string, lat: number, lng: number }[] = [];

  constructor(
    private snackBar: MatSnackBar
  ) { }

  async fetchLocations(query: string) {
    if (!query || query.length < 3) {
      this.locationOptions = [];
      return;
    }
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}, Kenya`
      );
      const data = await response.json();

      this.locationOptions = data.map((place: any) => ({
        name: place.display_name,
        lat: parseFloat(place.lat),
        lng: parseFloat(place.lon),
      }));
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  }

  selectLocation(event: any) {
    const selectedLocation = this.locationOptions.find(loc => loc.name === event.option.value);
    if (selectedLocation) {
      this.formData.Location = selectedLocation.name;
      this.formData.Latitude = selectedLocation.lat;
      this.formData.Longitude = selectedLocation.lng;
    }
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    // Basic Validation
    if (
      !this.formData.Username ||
      !this.formData.Location ||
      !this.formData.Email ||
      !this.formData.PasswordHash ||
      !this.formData.ConfirmPassword
    ) {
      this.openSnackbar('All fields are required.', 'error');
      return;
    }

    // Password Length and Alphanumeric Validation
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/;

    if (!passwordRegex.test(this.formData.PasswordHash)) {
      this.openSnackbar(
        'Password must be at least 8 characters long and contain both letters, numbers and special symbols.',
        'error'
      );
      return;
    }

    // Password Match Validation
    if (this.formData.PasswordHash !== this.formData.ConfirmPassword) {
      this.openSnackbar('Passwords do not match.', 'error');
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