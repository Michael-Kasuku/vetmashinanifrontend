import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetRewardComponent } from './vet-reward.component';

describe('VetRewardComponent', () => {
  let component: VetRewardComponent;
  let fixture: ComponentFixture<VetRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetRewardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
