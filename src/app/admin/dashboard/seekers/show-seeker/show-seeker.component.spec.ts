import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSeekerComponent } from './show-seeker.component';

describe('ShowSeekerComponent', () => {
  let component: ShowSeekerComponent;
  let fixture: ComponentFixture<ShowSeekerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSeekerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSeekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
