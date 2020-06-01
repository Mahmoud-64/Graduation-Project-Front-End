import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewLevelsFormComponent } from './interview-levels-form.component';

describe('InterviewLevelsFormComponent', () => {
  let component: InterviewLevelsFormComponent;
  let fixture: ComponentFixture<InterviewLevelsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewLevelsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewLevelsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
