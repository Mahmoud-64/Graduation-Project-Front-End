import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewLevelsItemComponent } from './interview-levels-item.component';

describe('InterviewLevelsItemComponent', () => {
  let component: InterviewLevelsItemComponent;
  let fixture: ComponentFixture<InterviewLevelsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewLevelsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewLevelsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
