import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(public snackBar: MatSnackBar) { }

  public showError(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
  }
}
