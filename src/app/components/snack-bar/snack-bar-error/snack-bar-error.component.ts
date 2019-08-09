import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-error',
  templateUrl: './snack-bar-error.component.html',
  styleUrls: ['./snack-bar-error.component.css']
})
export class SnackBarErrorComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
  }

}
