import { Component, OnInit } from '@angular/core';
import * as data from '../data/data.json';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { PricingComponent } from './pricing/pricing.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TeamComponent } from './team/team.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-root',
  imports: [
    NavigationComponent,
    HeaderComponent,
    AboutComponent,
    ServicesComponent,
    PricingComponent,
    TestimonialsComponent,
    TeamComponent,
    ContactComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  landingPageData: any = {};

  ngOnInit(): void {
    this.landingPageData = (data as any).default;
  }
}
