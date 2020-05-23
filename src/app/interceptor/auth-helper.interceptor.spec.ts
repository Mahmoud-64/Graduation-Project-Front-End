import { TestBed } from '@angular/core/testing';

import { AuthHelperInterceptor } from './auth-helper.interceptor';

describe('AuthHelperInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthHelperInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthHelperInterceptor = TestBed.inject(AuthHelperInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
