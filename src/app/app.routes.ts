import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DiseaseDiagnosisComponent } from './disease-diagnosis/disease-diagnosis.component';
import { FavoriteVetsComponent } from './favorite-vets/favorite-vets.component';
import { NearbyVetsComponent } from './nearby-vets/nearby-vets.component';
import { FarmerLoginComponent } from './farmer-login/farmer-login.component';
import { FarmerSignupComponent } from './farmer-signup/farmer-signup.component';
import { FarmerDashboardComponent } from './farmer-dashboard/farmer-dashboard.component';
import { FarmerNotificationsComponent } from './farmer-notifications/farmer-notifications.component';
import { FarmerRewardComponent } from './farmer-reward/farmer-reward.component';
import { FarmerProfileComponent } from './farmer-profile/farmer-profile.component';
import { FarmerAppointmentComponent } from './farmer-appointment/farmer-appointment.component';
import { VetLoginComponent } from './vet-login/vet-login.component';
import { VetSignupComponent } from './vet-signup/vet-signup.component';
import { VetDashboardComponent } from './vet-dashboard/vet-dashboard.component';
import { VetNotificationsComponent } from './vet-notifications/vet-notifications.component';
import { VetRewardComponent } from './vet-reward/vet-reward.component';
import { VetProfileComponent } from './vet-profile/vet-profile.component';
import { VetAppointmentComponent } from './vet-appointment/vet-appointment.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'disease/diagnosis', component: DiseaseDiagnosisComponent },
    { path: 'favorite/vets', component: FavoriteVetsComponent },
    { path: 'nearby/vets', component: NearbyVetsComponent },
    { path: 'farmer/login', component: FarmerLoginComponent },
    { path: 'farmer/signup', component: FarmerSignupComponent },
    { path: 'farmer/dashboard', component: FarmerDashboardComponent },
    { path: 'farmer/notifications', component: FarmerNotificationsComponent },
    { path: 'farmer/profile', component: FarmerProfileComponent },
    { path: 'farmer/rewards', component: FarmerRewardComponent },
    { path: 'farmer/appointments', component: FarmerAppointmentComponent },
    { path: 'vet/login', component: VetLoginComponent },
    { path: 'vet/signup', component: VetSignupComponent },
    { path: 'vet/dashboard', component: VetDashboardComponent },
    { path: 'vet/notifications', component: VetNotificationsComponent },
    { path: 'vet/rewards', component: VetRewardComponent },
    { path: 'vet/profile', component: VetProfileComponent },
    { path: 'vet/appointments', component: VetAppointmentComponent },
];
