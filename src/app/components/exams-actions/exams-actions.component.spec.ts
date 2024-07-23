import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsActionsComponent } from './exams-actions.component';

describe('ExamsActionsComponent', () => {
  let component: ExamsActionsComponent;
  let fixture: ComponentFixture<ExamsActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamsActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
