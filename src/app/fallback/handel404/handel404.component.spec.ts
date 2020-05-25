import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Handel404Component } from './handel404.component';

describe('Handel404Component', () => {
  let component: Handel404Component;
  let fixture: ComponentFixture<Handel404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Handel404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Handel404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
