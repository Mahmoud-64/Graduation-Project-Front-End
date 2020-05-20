import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLevelDetailsComponent } from './app-level-details.component';

describe('AppLevelDetailsComponent', () => {
  let component: AppLevelDetailsComponent;
  let fixture: ComponentFixture<AppLevelDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLevelDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLevelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
