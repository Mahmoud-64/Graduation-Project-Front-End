import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleInterviewComponent } from './single-interview.component';

describe('SingleInterviewComponent', () => {
  let component: SingleInterviewComponent;
  let fixture: ComponentFixture<SingleInterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleInterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
