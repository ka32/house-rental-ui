import { TestBed, inject } from '@angular/core/testing';

import { ConstHelperService } from './const-helper.service';

describe('ConstHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConstHelperService]
    });
  });

  it('should be created', inject([ConstHelperService], (service: ConstHelperService) => {
    expect(service).toBeTruthy();
  }));
});
