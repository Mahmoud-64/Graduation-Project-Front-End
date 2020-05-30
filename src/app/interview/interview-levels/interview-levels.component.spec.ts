import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewLevelsComponent } from './interview-levels.component';

describe('InterviewLevelsComponent', () => {
  let component: InterviewLevelsComponent;
  let fixture: ComponentFixture<InterviewLevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewLevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
