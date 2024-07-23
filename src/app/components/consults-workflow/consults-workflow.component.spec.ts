import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultsWorkflowComponent } from './consults-workflow.component';

describe('ConsultsWorkflowComponent', () => {
  let component: ConsultsWorkflowComponent;
  let fixture: ComponentFixture<ConsultsWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultsWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultsWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
