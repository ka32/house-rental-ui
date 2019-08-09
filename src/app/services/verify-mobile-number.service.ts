import { throwError as observableThrowError } from 'rxjs/internal/observable/throwError';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstHelperService } from './const-helper.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpHeaderService } from './http-header.service';
import { Observable, ObservableInput } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class VerifyMobileNumberService {
  constructor(
    private http: HttpClient,
    private constHelper: ConstHelperService,
    private zone: NgZone,
    private router: Router,
    private authService: AuthService,
    private httpHeaderService: HttpHeaderService
  ) {}

  public generateOtp(mobileNumber: string): Observable<any> {
    return this.http
      .post<Response>(
        this.constHelper.MobileNumberAPIUrl,
        mobileNumber,
        this.httpHeaderService.getHeader()
      )
      .pipe(catchError(error => this.onFailedOtpGeneration(error)));
  }

  //#region Private functions
  private onFailedOtpGeneration(error: any): ObservableInput<any> {
    console.error('An error occurred in generateOtp()', error); // DEBUG
    if (error.status === 401) {
      this.zone.run(() => {
        this.authService.deleteToken();
        this.authService.isTokenExpired();
        this.router.navigate([this.constHelper.SignInPageUrl]);
      });
    }

    return observableThrowError(error);
  }

  //#endregion
}
