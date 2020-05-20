import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLevelComponent } from './app-level.component';

describe('AppLevelComponent', () => {
  let component: AppLevelComponent;
  let fixture: ComponentFixture<AppLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
