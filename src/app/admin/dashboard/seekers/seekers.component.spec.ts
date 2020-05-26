import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekersComponent } from './seekers.component';

describe('SeekersComponent', () => {
  let component: SeekersComponent;
  let fixture: ComponentFixture<SeekersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
