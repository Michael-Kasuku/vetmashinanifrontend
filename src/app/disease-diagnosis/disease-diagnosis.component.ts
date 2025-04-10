import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import progress spinner
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-disease-diagnosis',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule, 
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './disease-diagnosis.component.html',
  styleUrl: './disease-diagnosis.component.scss',
})
export class DiseaseDiagnosisComponent {
  symptoms: string[] = [];
  diagnosisResult: any;
  symptomControl = new FormControl('');
  filteredSymptoms!: Observable<string[]>;
  loading: boolean = false; // New variable to track loading state

  allSymptoms: string[] = [
    "anorexia", "abdominal pain", "anaemia", "abortions", "acetone", "aggression",
    "arthrogyposis", "ankylosis", "anxiety", "bellowing", "blood loss", "blood poisoning",
    "blisters", "colic", "condemnation of livers", "conjunctivae", "coughing", "depression",
    "discomfort", "dyspnea", "dysentery", "diarrhoea", "dehydration", "drooling", "dull",
    "decreased fertility", "difficulty breath", "emaciation", "encephalitis", "fever",
    "facial paralysis", "frothing of mouth", "frothing", "gaseous stomach", "highly diarrhoea",
    "high pulse rate", "high temp", "high proportion", "hyperaemia", "hydrocephalus",
    "isolation from herd", "infertility", "intermittent fever", "jaundice", "ketosis",
    "loss of appetite", "lameness", "lack of coordination", "lethargy", "lacrimation",
    "milk flakes", "milk watery", "milk clots", "mild diarrhoea", "moaning",
    "mucosal lesions", "milk fever", "nausea", "nasal discharges", "oedema", "pain",
    "painful tongue", "pneumonia", "photo sensitization", "quivering lips",
    "reduction milk yields", "rapid breathing", "rumenstasis", "reduced rumination",
    "reduced fertility", "reduced fat", "reduces feed intake", "raised breathing",
    "stomach pain", "salivation", "stillbirths", "shallow breathing", "swollen pharyngeal",
    "swelling", "saliva", "swollen tongue", "tachycardia", "torticollis", "udder swelling",
    "udder heat", "udder hardness", "udder redness", "udder pain", "unwillingness to move",
    "ulcers", "vomiting", "weight loss", "weakness"
  ];

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.filteredSymptoms = this.symptomControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSymptoms.filter(symptom =>
      symptom.toLowerCase().includes(filterValue)
    );
  }

  addSymptom(symptom: string) {
    if (symptom && !this.symptoms.includes(symptom)) {
      this.symptoms.push(symptom);
    }
    this.symptomControl.setValue('');
  }

  removeSymptom(symptom: string) {
    this.symptoms = this.symptoms.filter(s => s !== symptom);
  }

  diagnose() {
    this.loading = true; // Show progress spinner
    this.diagnosisResult = null; // Clear previous result

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = this.symptoms.map(symptom => `symptoms[]=${encodeURIComponent(symptom)}`).join('&');

    this.http.post('http://localhost:8000/predict/disease', body, { headers }).subscribe(
      response => {
        this.diagnosisResult = response;
        this.openSnackbar('Diagnosis Successful!','success');
        this.loading = false; // Hide progress spinner
      },
      error => {
        this.openSnackbar('Oops! Couldn\'t Perform Diagnosis.','error');
        this.loading = false; // Hide progress spinner
      }
    );
  }

  formatDiseaseName(disease: string): string {
    if (!disease) return '';
    return disease.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
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
