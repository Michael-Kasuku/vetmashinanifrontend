import { Routes } from '@angular/router';
import { DiseaseDiagnosisComponent } from './disease-diagnosis/disease-diagnosis.component';
import { FarmerLoginComponent } from './farmer-login/farmer-login.component';
import { FarmerSignupComponent } from './farmer-signup/farmer-signup.component';
import { VetDashboardComponent } from './vet-dashboard/vet-dashboard.component';

export const routes: Routes = [
    { path: '', component: FarmerLoginComponent },
    { path: 'farmer/login', component: FarmerLoginComponent },
    { path: 'farmer/signup', component: FarmerSignupComponent },
    { path: 'disease/diagnosis', component: DiseaseDiagnosisComponent },
    { path: 'vet/dashboard', component: VetDashboardComponent }, 
];
