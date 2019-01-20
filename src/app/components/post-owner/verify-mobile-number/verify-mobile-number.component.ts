import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-verify-mobile-number',
  templateUrl: './verify-mobile-number.component.html',
  styleUrls: ['./verify-mobile-number.component.css']
})
export class VerifyMobileNumberComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  yes = 'yes';

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}

  public generateOtp(): void {}
}
