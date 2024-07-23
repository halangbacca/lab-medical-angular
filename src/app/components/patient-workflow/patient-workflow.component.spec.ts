import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientWorkflowComponent } from './patient-workflow.component';

describe('PatientWorkflowComponent', () => {
  let component: PatientWorkflowComponent;
  let fixture: ComponentFixture<PatientWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
