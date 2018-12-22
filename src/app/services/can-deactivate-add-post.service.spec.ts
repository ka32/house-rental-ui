import { TestBed } from '@angular/core/testing';

import { CanDeactivateManagePostsService } from './can-deactivate-add-post.service';

describe('CanDeactivateManagePostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanDeactivateManagePostsService = TestBed.get(CanDeactivateManagePostsService);
    expect(service).toBeTruthy();
  });
});
