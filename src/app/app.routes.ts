import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FarmerLoginComponent } from './farmer-login/farmer-login.component';
import { FarmerSignupComponent } from './farmer-signup/farmer-signup.component';
import { FarmerDashboardComponent } from './farmer-dashboard/farmer-dashboard.component';
import { VetLoginComponent } from './vet-login/vet-login.component';
import { VetSignupComponent } from './vet-signup/vet-signup.component';
import { VetDashboardComponent } from './vet-dashboard/vet-dashboard.component';
import { DiseaseDiagnosisComponent } from './disease-diagnosis/disease-diagnosis.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'farmer/login', component: FarmerLoginComponent },
    { path: 'farmer/signup', component: FarmerSignupComponent },
    { path: 'farmer/dashboard', component: FarmerDashboardComponent },
    { path: 'vet/login', component: VetLoginComponent },
    { path: 'vet/signup', component: VetSignupComponent },
    { path: 'vet/dashboard', component: VetDashboardComponent },
    { path: 'disease/diagnosis', component: DiseaseDiagnosisComponent } 
];
