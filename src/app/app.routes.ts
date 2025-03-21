import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FarmerLoginComponent } from './farmer-login/farmer-login.component';
import { FarmerSignupComponent } from './farmer-signup/farmer-signup.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'farmer/login', component: FarmerLoginComponent },
    { path: 'farmer/signup', component: FarmerSignupComponent }
];
