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
  suggestions: string[] = [
    "computer",
    "software",
    "scholarship",
    "grant",
    "job",
    "remote",
    "opportunities",
    "internship",
    "technology",
    "developer"
  ];
  filteredSuggestions: string[] = [];

  constructor(private http: HttpClient) {}

  // Function to handle the search query when the user clicks the search button
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

  // HTTP call to the backend API
  fetchOpportunities(searchPhrase: string): Observable<any> {
    const apiUrl = `https://michaelotienokasuku.pythonanywhere.com/vetmashinani/jobvibe/?search_phrase=${encodeURIComponent(searchPhrase)}`;
    return this.http.get<any>(apiUrl);
  }

  // Handle input change and filter the suggestions
  onInputChange(): void {
    this.filteredSuggestions = this.suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(this.searchPhrase.toLowerCase())
    );
  }

  // Select a suggestion from the autocomplete list
  selectSuggestion(suggestion: string): void {
    this.searchPhrase = suggestion;
    this.filteredSuggestions = [];
    this.searchOpportunities();
  }
}
