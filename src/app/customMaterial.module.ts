import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
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
