import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResFormComponent } from './res-form.component';

describe('ResFormComponent', () => {
  let component: ResFormComponent;
  let fixture: ComponentFixture<ResFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResFormComponent]
    });
    fixture = TestBed.createComponent(ResFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
