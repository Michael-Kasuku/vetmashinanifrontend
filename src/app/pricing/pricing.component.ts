import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Define interfaces for better structure and type safety
interface Plan {
  price: string;
  discount?: string;
  features: string[];
  duration: string;
  renewal: string;
}

interface Service {
  icon: string;
  service: string;
  [plan: string]: any; // Allows dynamic plan names
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent {
  @Input() data: Service[] = [];

  // Map plan names to button classes
  private planClassMap: { [key: string]: string } = {
    basic: 'btn-success',
    elite: 'btn-warning'
  };

  getPlanClass(plan: string): string {
    if (!plan) return 'btn-danger'; // Default if plan is undefined/null
    const key = plan.toLowerCase().split(' ')[0]; // Extract the first word
    return this.planClassMap[key] || 'btn-danger';
  }

  getButtonLabel(plan: string): string {
    return 'Subscribe';
  }  

  // Dynamically extract plan names instead of hardcoding them
  getPlanNames(service: Service): string[] {
    return Object.keys(service).filter(
      key => key !== 'icon' && key !== 'service'
    );
  }
}
