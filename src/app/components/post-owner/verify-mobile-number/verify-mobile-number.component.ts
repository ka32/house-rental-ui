import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { VerifyMobileNumberService } from 'src/app/services/verify-mobile-number.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ManagePostsService } from 'src/app/services/manage-posts.service';
import { Router } from '@angular/router';
import { ConstHelperService } from 'src/app/services/const-helper.service';

@Component({
  selector: 'app-verify-mobile-number',
  templateUrl: './verify-mobile-number.component.html',
  styleUrls: ['./verify-mobile-number.component.css']
})
export class VerifyMobileNumberComponent implements OnInit {
  private mobileNumber: string;
  public isSaveInProgress = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private verifyMobileNumberService: VerifyMobileNumberService,
    private snackBarService: SnackBarService,
    private managePostsService: ManagePostsService,
    private constHelper: ConstHelperService,
    private router: Router
  ) {
    this.mobileNumber = data.message;
  }
  @Input()
  saveMode: string;
  yes = 'yes';

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
  //#region Private functions
  private onSuccessfulOtpGeneration(response: any, msg: string) {
    this.isSaveInProgress = false;
    this.snackBarService.showInfo(msg);
    this.managePostsService.canDeactivate = true;
    this.navigateToPreviousPage();
  }

  private navigateToPreviousPage() {
    if (this.saveMode === 'update') {
      this.router.navigate([this.constHelper.ManagePostsPageUrl]);
    } else {
      this.router.navigate([this.constHelper.HomePageUrl]);
    }
  }

  private onFailedOtpGeneration(error: any): void {
    this.isSaveInProgress = false;
    let errorMsg =
      this.saveMode === 'update'
        ? 'Failed to Update Post. '
        : 'Failed to Create Post. ';

    if (error.status === 0) {
      errorMsg += 'KA32 Servers are temporarily down.';
    } else {
      console.log('Error: ' + error.error);
    }

    this.snackBarService.showError(errorMsg);
  }

  //#endregion

  //#region Public methods
  public generateOtp(): void {
    this.verifyMobileNumberService
      .generateOtp(this.mobileNumber)
      .subscribe(
        resp =>
          this.onSuccessfulSave(
            resp,
            'Your post has been created successfully'
          ),
        error => this.onFailedSave(error)
      );
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  private onSuccessfulSave(response: any, msg: string) {
    this.isSaveInProgress = false;
    this.snackBarService.showInfo(msg);
    this.managePostsService.canDeactivate = true;
    this.navigateToPreviousPage();
  }

  private onFailedSave(error: any): void {
    this.isSaveInProgress = false;
    let errorMsg =
      this.saveMode === 'update'
        ? 'Failed to Update Post. '
        : 'Failed to Create Post. ';

    if (error.status === 0) {
      errorMsg += 'KA32 Servers are temporarily down.';
    } else if (error.error === 'You reached maximum posts limit') {
      errorMsg += 'As you reaced maximum posts limit';
    } else {
      console.log('Error: ' + error.error);
    }

    this.snackBarService.showError(errorMsg);
  }
}
