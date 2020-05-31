import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTypesListComponent } from './contact-types-list.component';

describe('ContactTypesListComponent', () => {
  let component: ContactTypesListComponent;
  let fixture: ComponentFixture<ContactTypesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactTypesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
