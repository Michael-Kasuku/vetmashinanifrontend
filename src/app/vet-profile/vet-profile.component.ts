import { Component, OnInit } from '@angular/core';
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
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-vet-profile',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    MatAutocompleteModule,
    MatDividerModule
  ],
  templateUrl: './vet-profile.component.html',
  styleUrl: './vet-profile.component.scss'
})
export class VetProfileComponent implements OnInit{
  vetName: string = '';
  formData = {
    Location: '',
    Latitude: 0.0,
    Longitude: 0.0
  };

  locationOptions: { name: string, lat: number, lng: number }[] = [];
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
    } else {
      this.vetName = 'Unknown Vet';
      this.openSnackbar('Vet information missing. Please log in.', 'error');
      this.router.navigate(['/vet/login']);
    }
  }

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
      !this.formData.Location
    ) {
      this.openSnackbar('Location is required.', 'error');
      return;
    }

    

    const payload = {
      username: this.vetName,
      location_lat: this.formData.Latitude,
      location_lng: this.formData.Longitude
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.patch('http://127.0.0.1:8000/update-profile/', payload, { headers })
      .subscribe({
        next: (res: any) => {
          this.openSnackbar(res.message || 'Location updated successfully!', 'success');
          setTimeout(() => {
            this.router.navigate(['/vet/dashboard']);
          }, 1500);
        },
        error: (err: any) => {
          const errorMsg = err?.error?.error || 'Location update failed. Please try again.';
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
