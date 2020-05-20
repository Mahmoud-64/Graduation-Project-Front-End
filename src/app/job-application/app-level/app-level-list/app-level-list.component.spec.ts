import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLevelListComponent } from './app-level-list.component';

describe('AppLevelListComponent', () => {
  let component: AppLevelListComponent;
  let fixture: ComponentFixture<AppLevelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLevelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
