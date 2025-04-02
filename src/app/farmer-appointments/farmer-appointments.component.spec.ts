import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerAppointmentsComponent } from './farmer-appointments.component';

describe('FarmerAppointmentsComponent', () => {
  let component: FarmerAppointmentsComponent;
  let fixture: ComponentFixture<FarmerAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
