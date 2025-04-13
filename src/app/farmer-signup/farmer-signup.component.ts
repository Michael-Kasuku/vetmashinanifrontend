import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

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
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router // Inject Router
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

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/;

    if (!passwordRegex.test(this.formData.PasswordHash)) {
      this.openSnackbar(
        'Password must be at least 8 characters long and contain both letters, numbers and special symbols.',
        'error'
      );
      return;
    }

    if (this.formData.PasswordHash !== this.formData.ConfirmPassword) {
      this.openSnackbar('Passwords do not match.', 'error');
      return;
    }

    const payload = {
      username: this.formData.Username,
      email: this.formData.Email,
      password: this.formData.PasswordHash,
      is_farmer: true,
      is_vet: false,
      location_lat: this.formData.Latitude,
      location_lng: this.formData.Longitude
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post('https://michaelotienokasuku.pythonanywhere.com/signup/', payload, { headers })
      .subscribe({
        next: (res: any) => {
          this.openSnackbar(res.message || 'Signup successful!', 'success');
          setTimeout(() => {
            this.router.navigate(['/farmer/login']);
          }, 1500);
        },
        error: (err: any) => {
          const errorMsg = err?.error?.error || 'Signup failed. Please try again.';
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

  closeSnackbar() {
    this.snackBar.dismiss();
  }
}
