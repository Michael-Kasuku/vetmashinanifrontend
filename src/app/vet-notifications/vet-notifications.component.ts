import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-vet-notifications',
  standalone:true,
  imports: [
    CommonModule,
    MatSnackBarModule,
  ],
  templateUrl: './vet-notifications.component.html',
  styleUrl: './vet-notifications.component.scss'
})
export class VetNotificationsComponent implements OnInit{
  vetName: string = '';
  unreadNotifications: any[] = [];
  readNotifications: any[] = [];

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedName = localStorage.getItem('vet_name');

    if (storedName) {
      this.vetName = storedName;
      this.loadNotifications();
    } else {
      this.vetName = 'Unknown Vet';
      this.openSnackbar('Vet information missing. Please log in.', 'error');
      this.router.navigate(['/vet/login']);
    }
  }

  loadNotifications(): void {
    this.http.get<any[]>(`https://michaelotienokasuku.pythonanywhere.com/get-notifications/?username=${this.vetName}`)
      .pipe(
        catchError(err => {
          this.openSnackbar('Error loading notifications', 'error');
          throw err;
        })
      )
      .subscribe(data => {
        this.unreadNotifications = data.filter(n => !n.is_read);
        this.readNotifications = data.filter(n => n.is_read);
      });
  }

  markAsRead(notificationId: number): void {
    const body = { notification_id: notificationId };

    this.http.patch('https://michaelotienokasuku.pythonanywhere.com/mark-notification-as-read/', body)
      .pipe(
        catchError(err => {
          this.openSnackbar('Error marking notification as read', 'error');
          throw err;
        })
      )
      .subscribe(response => {
        this.openSnackbar('Notification marked as read', 'success');
        this.loadNotifications(); // Reload and re-filter notifications
      });
  }

  formatToEAT(dateString: string): string {
    const utcDate = new Date(dateString);
    const eatOffsetMs = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
    const eatDate = new Date(utcDate.getTime() + eatOffsetMs);
  
    return eatDate.toLocaleString('en-KE', {
      timeZone: 'Africa/Nairobi',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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
