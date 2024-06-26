import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnulerReservationComponent } from './annuler-reservation.component';

describe('AnnulerReservationComponent', () => {
  let component: AnnulerReservationComponent;
  let fixture: ComponentFixture<AnnulerReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnulerReservationComponent]
    });
    fixture = TestBed.createComponent(AnnulerReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
