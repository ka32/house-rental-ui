import { TestBed, inject } from '@angular/core/testing';

import { AnonymousAuthGuardSerivce } from './anonymous-auth-guard-serivce';

describe('AnonymousAuthGuardSerivceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnonymousAuthGuardSerivce]
    });
  });

  it('should be created', inject([AnonymousAuthGuardSerivce], (service: AnonymousAuthGuardSerivce) => {
    expect(service).toBeTruthy();
  }));
});
