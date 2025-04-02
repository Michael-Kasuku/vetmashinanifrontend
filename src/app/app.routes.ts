import { Routes } from '@angular/router';
import { DiseaseDiagnosisComponent } from './disease-diagnosis/disease-diagnosis.component';
import { HomeComponent } from './home/home.component';
import { FarmerLoginComponent } from './farmer-login/farmer-login.component';
import { FarmerSignupComponent } from './farmer-signup/farmer-signup.component';
import { FarmerForgotComponent } from './farmer-forgot/farmer-forgot.component';
import { FarmerAppointmentsComponent } from './farmer-appointments/farmer-appointments.component';
import { TeleVetComponent } from './tele-vet/tele-vet.component';
import { AgrovetHubComponent } from './agrovet-hub/agrovet-hub.component';
import { JobVibeComponent } from './job-vibe/job-vibe.component';
import { EduContentComponent } from './edu-content/edu-content.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'farmer/login', component: FarmerLoginComponent },
    { path: 'farmer/signup', component: FarmerSignupComponent },
    { path: 'farmer/forgot', component: FarmerForgotComponent },
    { path: 'farmer/appointments', component: FarmerAppointmentsComponent },
    { path: 'farmer/televet', component: TeleVetComponent },
    { path: 'disease/diagnosis', component: DiseaseDiagnosisComponent },
    { path: 'agrovet/hub', component: AgrovetHubComponent },
    { path: 'job/vibe', component: JobVibeComponent },
    { path: 'edu/content', component: EduContentComponent },

    
];
