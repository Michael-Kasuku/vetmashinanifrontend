import { Routes } from '@angular/router';
import { DiseaseDiagnosisComponent } from './disease-diagnosis/disease-diagnosis.component';
import { HomeComponent } from './home/home.component';
import { FarmerLoginComponent } from './farmer-login/farmer-login.component';
import { FarmerSignupComponent } from './farmer-signup/farmer-signup.component';
import { FarmerForgotComponent } from './farmer-forgot/farmer-forgot.component';

export const routes: Routes = [
    { path: 'disease/diagnosis', component: DiseaseDiagnosisComponent },
    { path: '', component: HomeComponent },
    { path: 'farmer/login', component: FarmerLoginComponent },
    { path: 'farmer/signup', component: FarmerSignupComponent },
    { path: 'farmer/forgot', component: FarmerForgotComponent },
];
