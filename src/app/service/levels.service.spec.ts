import { TestBed } from '@angular/core/testing';

import { LevelsService } from './levels.service';

describe('LevelsService', () => {
  let service: LevelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
