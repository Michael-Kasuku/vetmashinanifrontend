import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-vet-appointment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './vet-appointment.component.html',
  styleUrl: './vet-appointment.component.scss'
})
export class VetAppointmentComponent implements OnInit {
  vetName: string = '';
  approvedAppointments: any[] = [];
  cancelledAppointments: any[] = [];
  pendingAppointments: any[] = [];

  showDialog: boolean = false;
  selectedAppointmentId: number | null = null;
  selectedAction: 'approved' | 'cancelled' | null = null;
  vetNote: string = '';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchVetData();
    this.loadAppointments();
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

  loadAppointments(): void {
    this.http.get<any[]>(`https://michaelotienokasuku.pythonanywhere.com/appointments/?username=${this.vetName}`)
      .pipe(
        catchError(err => {
          this.openSnackbar('Error loading appointments', 'error');
          throw err;
        })
      )
      .subscribe(data => {
        this.pendingAppointments = data.filter(n => n.status === 'pending');
        this.approvedAppointments = data.filter(n => n.status === 'approved');
        this.cancelledAppointments = data.filter(n => n.status === 'cancelled');
      });
  }

  convertToEAT(utcTime: string): string {
    const date = new Date(utcTime);
    const eatTime = new Date(date.getTime() + 3 * 60 * 60 * 1000);
    return eatTime.toLocaleString('en-KE', {
      timeZone: 'Africa/Nairobi',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  openSnackbar(message: string, severity: 'success' | 'error') {
    const snackBarClass = severity === 'success' ? 'snackbar-success' : 'snackbar-error';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: snackBarClass,
    });
  }

  openDialog(appointmentId: number, action: 'approved' | 'cancelled') {
    this.selectedAppointmentId = appointmentId;
    this.selectedAction = action;
    this.vetNote = '';
    this.showDialog = true;
  }

  submitNote() {
    const appointmentId = this.selectedAppointmentId !== null ? parseInt(this.selectedAppointmentId.toString(), 10) : null;
  
    if (appointmentId && this.selectedAction && this.vetNote.trim()) {
      const payload = {
        appointment_id: appointmentId,
        status: this.selectedAction,
        vet_note: this.vetNote,
        username: this.vetName
      };
  
      this.http.patch('https://michaelotienokasuku.pythonanywhere.com/appointments/', payload)
        .subscribe({
          next: () => {
            this.openSnackbar(`Appointment ${this.selectedAction}`, 'success');
            this.loadAppointments();
            this.closeDialog();
          },
          error: () => {
            this.openSnackbar('Failed to update appointment', 'error');
          }
        });
    } else {
      console.log(this.vetNote);
      console.log(this.vetNote.trim());
      console.log(this.selectedAppointmentId);
      console.log(this.selectedAction);
      this.openSnackbar('Please enter a note.', 'error');
    }
  }  

  closeDialog() {
    this.showDialog = false;
    this.selectedAppointmentId = null;
    this.selectedAction = null;
    this.vetNote = '';
  }
}
