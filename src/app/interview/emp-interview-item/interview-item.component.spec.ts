import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewItemComponent } from './interview-item.component';

describe('InterviewItemComponent', () => {
  let component: InterviewItemComponent;
  let fixture: ComponentFixture<InterviewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
