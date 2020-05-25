import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Handel500Component } from './handel500.component';

describe('Handel500Component', () => {
  let component: Handel500Component;
  let fixture: ComponentFixture<Handel500Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Handel500Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Handel500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
