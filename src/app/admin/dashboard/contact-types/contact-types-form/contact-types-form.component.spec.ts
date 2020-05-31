import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTypesFormComponent } from './contact-types-form.component';

describe('ContactTypesFormComponent', () => {
  let component: ContactTypesFormComponent;
  let fixture: ComponentFixture<ContactTypesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactTypesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactTypesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
