import { TestBed } from '@angular/core/testing';

import { ThirdPartyObjectsService } from './third-party-objects.service';

describe('ThirdPartyObjectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThirdPartyObjectsService = TestBed.get(ThirdPartyObjectsService);
    expect(service).toBeTruthy();
  });
});
