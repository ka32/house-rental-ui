import { TestBed, inject } from '@angular/core/testing';

import { FurnishTypeService } from './furnish-type.service';

describe('FurnishTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FurnishTypeService]
    });
  });

  it('should be created', inject([FurnishTypeService], (service: FurnishTypeService) => {
    expect(service).toBeTruthy();
  }));
});
