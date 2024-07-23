import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsWorkflowComponent } from './exams-workflow.component';

describe('ExamsWorkflowComponent', () => {
  let component: ExamsWorkflowComponent;
  let fixture: ComponentFixture<ExamsWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamsWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamsWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
