import { Injectable } from '@angular/core';
import { AddPostComponent } from '../components/post-owner/add-post/add-post.component';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AddPostService } from './add-post.service';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateAddPostService
  implements CanDeactivate<AddPostComponent> {
  constructor(private addPostService: AddPostService) {}

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.addPostService.canDeactivate) {
      return true;
    }

    const result = window.confirm(
      'You have unsaved changes. Want to save them before leaving the page?'
    );

    if (result === false) {
      this.addPostService.canDeactivate = true;
    }

    return this.addPostService.canDeactivate;
  }
}
