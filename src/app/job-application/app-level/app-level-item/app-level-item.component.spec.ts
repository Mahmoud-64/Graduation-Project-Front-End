import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLevelItemComponent } from './app-level-item.component';

describe('AppLevelItemComponent', () => {
  let component: AppLevelItemComponent;
  let fixture: ComponentFixture<AppLevelItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLevelItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLevelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
