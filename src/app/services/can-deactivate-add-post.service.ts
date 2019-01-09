import { Injectable } from '@angular/core';
import { AddPostComponent } from '../components/post-owner/add-post/add-post.component';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ManagePostsService } from './manage-posts.service';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateManagePostsService
  implements CanDeactivate<AddPostComponent> {
  constructor(private ManagePostsService: ManagePostsService) {}

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.ManagePostsService.canDeactivate) {
      return true;
    }

    const result = window.confirm(
      'You have unsaved changes. Want to save them before leaving the page?'
    );

    if (result === false) {
      this.ManagePostsService.canDeactivate = true;
    }

    return this.ManagePostsService.canDeactivate;
  }
}
