import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEmployeeComponent } from './show-employee.component';

describe('ShowEmployeeComponent', () => {
  let component: ShowEmployeeComponent;
  let fixture: ComponentFixture<ShowEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
