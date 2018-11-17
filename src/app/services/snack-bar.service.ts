import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { SnackBarErrorComponent } from '../components/snack-bar/snack-bar-error/snack-bar-error.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(public snackBar: MatSnackBar) { }

  public showError(message: string): void {
    this.snackBar.openFromComponent(SnackBarErrorComponent, {
      duration: 30000,
      data: message
    });
  }
}
