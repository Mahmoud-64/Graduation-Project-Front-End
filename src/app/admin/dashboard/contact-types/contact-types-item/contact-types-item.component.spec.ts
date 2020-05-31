import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTypesItemComponent } from './contact-types-item.component';

describe('ContactTypesItemComponent', () => {
  let component: ContactTypesItemComponent;
  let fixture: ComponentFixture<ContactTypesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactTypesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactTypesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
