import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vet-dashboard',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './vet-dashboard.component.html',
  styleUrl: './vet-dashboard.component.scss'
})
export class VetDashboardComponent implements OnInit {

  upcomingAppointments = [
    { name: 'Wiliam Ruto', date: '4th April 2025', time: '10:00 AM', purpose: 'General', location: 'Eldoret Farm', contact: '+254700123456' },
    { name: 'Charlene Ruto', date: '4th April 2025', time: '11:00 AM', purpose: 'General', location: 'Nairobi Dairy', contact: '+254711654321' }
  ];

  constructor() {}

  ngOnInit(): void {}

  acceptAppointment(index: number) {
    console.log(`Accepted appointment for ${this.upcomingAppointments[index].name} at ${this.upcomingAppointments[index].location} on ${this.upcomingAppointments[index].date} at ${this.upcomingAppointments[index].time}`);
  }

  cancelAppointment(index: number) {
    console.log(`Cancelled appointment for ${this.upcomingAppointments[index].name}`);
  }
}
