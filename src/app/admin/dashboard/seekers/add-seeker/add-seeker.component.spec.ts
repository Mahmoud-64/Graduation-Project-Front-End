import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeekerComponent } from './add-seeker.component';

describe('AddSeekerComponent', () => {
  let component: AddSeekerComponent;
  let fixture: ComponentFixture<AddSeekerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSeekerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSeekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
