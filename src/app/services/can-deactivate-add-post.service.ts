import { Injectable } from '@angular/core';
import { AddPostComponent } from '../components/post-owner/add-post/add-post.component';
import { CanDeactivate } from '@angular/router';
import { Observable} from 'rxjs/internal/Observable';
import { ManagePostsService } from './manage-posts.service';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateManagePostsService
  implements CanDeactivate<AddPostComponent> {
  constructor(private managePostsService: ManagePostsService) {}

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.managePostsService.canDeactivate) {
      return true;
    }

    const result = window.confirm(
      'You have unsaved changes. Want to save them before leaving the page?'
    );

    if (result === false) {
      this.managePostsService.canDeactivate = true;
    }

    return this.managePostsService.canDeactivate;
  }
}
