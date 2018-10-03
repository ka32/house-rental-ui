import { TestBed, inject } from '@angular/core/testing';

import { AddPostService } from './add-post.service';

describe('AddPostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddPostService]
    });
  });

  it('should be created', inject([AddPostService], (service: AddPostService) => {
    expect(service).toBeTruthy();
  }));
});
