import { TestBed } from '@angular/core/testing';

import { CanDeactivateAddPostService } from './can-deactivate-add-post.service';

describe('CanDeactivateAddPostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanDeactivateAddPostService = TestBed.get(CanDeactivateAddPostService);
    expect(service).toBeTruthy();
  });
});
