import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsActionsComponent } from './appointments-actions.component';

describe('AppointmentsActionsComponent', () => {
  let component: AppointmentsActionsComponent;
  let fixture: ComponentFixture<AppointmentsActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentsActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
