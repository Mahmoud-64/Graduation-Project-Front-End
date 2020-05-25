import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Handel403Component } from './handel403.component';

describe('Handel403Component', () => {
  let component: Handel403Component;
  let fixture: ComponentFixture<Handel403Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Handel403Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Handel403Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
