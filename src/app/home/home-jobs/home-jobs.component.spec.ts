import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeJobsComponent } from './home-jobs.component';

describe('HomeJobsComponent', () => {
  let component: HomeJobsComponent;
  let fixture: ComponentFixture<HomeJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
