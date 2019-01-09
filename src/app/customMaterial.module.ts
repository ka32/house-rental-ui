import {
  MatButtonModule, MatCheckboxModule, MatGridListModule, MatDividerModule, MatCardModule, MatAutocompleteModule,
  MatFormFieldModule, MatInputModule, MatSnackBarModule, MatDialogModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, BrowserAnimationsModule, MatToolbarModule, MatGridListModule,
    MatDividerModule, MatCardModule, MatAutocompleteModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule, MatDialogModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatGridListModule, MatDividerModule, MatCardModule, MatAutocompleteModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatDialogModule],
})
export class CustomMaterialModule { }
