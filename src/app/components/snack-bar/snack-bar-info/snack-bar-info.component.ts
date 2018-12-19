import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snack-bar-info',
  templateUrl: './snack-bar-info.component.html',
  styleUrls: ['./snack-bar-info.component.css']
})
export class SnackBarInfoComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
  }

}
