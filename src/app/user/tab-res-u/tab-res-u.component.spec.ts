import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabResUComponent } from './tab-res-u.component';

describe('TabResUComponent', () => {
  let component: TabResUComponent;
  let fixture: ComponentFixture<TabResUComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabResUComponent]
    });
    fixture = TestBed.createComponent(TabResUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
