import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentWorkflowComponent } from './appointment-workflow.component';

describe('AppointmentWorkflowComponent', () => {
  let component: AppointmentWorkflowComponent;
  let fixture: ComponentFixture<AppointmentWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
