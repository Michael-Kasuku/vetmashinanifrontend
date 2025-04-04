import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-vibe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './job-vibe.component.html',
  styleUrl: './job-vibe.component.scss'
})
export class JobVibeComponent {
  searchPhrase: string = '';
  results: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  searchOpportunities(): void {
    if (this.searchPhrase.trim()) {
      this.isLoading = true;
      this.errorMessage = '';

      this.fetchOpportunities(this.searchPhrase).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response.results) {
            this.results = response.results;
          } else {
            this.errorMessage = response.message || 'No results found.';
            this.results = [];
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'An error occurred while fetching results. Please try again later.';
          console.error(err);
        }
      });
    }
  }

  fetchOpportunities(searchPhrase: string): Observable<any> {
    const apiUrl = `https://michaelotienokasuku.pythonanywhere.com/vetmashinani/jobvibe/?search_phrase=${encodeURIComponent(searchPhrase)}`;
    return this.http.get<any>(apiUrl);
  }
}
