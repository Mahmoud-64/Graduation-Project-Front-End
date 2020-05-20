import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppItemComponent } from './app-item.component';

describe('AppItemComponent', () => {
  let component: AppItemComponent;
  let fixture: ComponentFixture<AppItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
