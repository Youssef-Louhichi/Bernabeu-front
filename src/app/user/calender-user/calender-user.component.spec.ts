import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderUserComponent } from './calender-user.component';

describe('CalenderUserComponent', () => {
  let component: CalenderUserComponent;
  let fixture: ComponentFixture<CalenderUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalenderUserComponent]
    });
    fixture = TestBed.createComponent(CalenderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
