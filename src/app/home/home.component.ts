import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) {}

  // Navigate to Farmer Login
  navigateToFarmer() {
    this.router.navigate(['/farmer/login']);
  }

  // Navigate to Login
  navigateToVet() {
    this.router.navigate(['/vet/login']);
  }
}
