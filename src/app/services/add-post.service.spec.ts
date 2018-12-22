import { TestBed, inject } from '@angular/core/testing';

import { ManagePostsService } from './manage-posts.service';

describe('ManagePostsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagePostsService]
    });
  });

  it('should be created', inject([ManagePostsService], (service: ManagePostsService) => {
    expect(service).toBeTruthy();
  }));
});
