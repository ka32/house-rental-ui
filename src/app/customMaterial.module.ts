import {
  MatButtonModule, MatCheckboxModule, MatGridListModule, MatDividerModule, MatCardModule, MatAutocompleteModule,
  MatFormFieldModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatMenuModule
} from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, BrowserAnimationsModule, MatToolbarModule, MatGridListModule,
    MatDividerModule, MatCardModule, MatAutocompleteModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatTooltipModule, MatMenuModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatGridListModule, MatDividerModule, MatCardModule, MatAutocompleteModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatMenuModule,
    MatTooltipModule],
})
export class CustomMaterialModule { }
