import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarErrorComponent } from '../components/snack-bar/snack-bar-error/snack-bar-error.component';
import { SnackBarInfoComponent } from '../components/snack-bar/snack-bar-info/snack-bar-info.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(public snackBar: MatSnackBar) { }

  public showError(message: string): void {
    this.snackBar.openFromComponent(SnackBarErrorComponent, {
      duration: 4000,
      data: message
    });
  }

  public showInfo(message: string): void {
    this.snackBar.openFromComponent(SnackBarInfoComponent, {
      duration: 4000,
      data: message
    });
  }
}
