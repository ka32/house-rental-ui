import { TestBed } from '@angular/core/testing';

import { VerifyMobileNumberService } from './verify-mobile-number.service';

describe('VerifyMobileNumberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerifyMobileNumberService = TestBed.get(VerifyMobileNumberService);
    expect(service).toBeTruthy();
  });
});
