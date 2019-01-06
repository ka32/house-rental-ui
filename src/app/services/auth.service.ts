import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ConstHelperService } from './const-helper.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { tap, catchError } from 'rxjs/operators';
import { IFbAuthResponse } from './../models/fb-auth-response.model';
import { ILoginResponse } from './../models/login-reponse';
import * as jwt_decode from 'jwt-decode';

declare const FB: any;

@Injectable()
export class AuthService {

  provider: any;
  user: string;
  private fbAuthResponse: IFbAuthResponse;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public loginEvent: Subject<ILoginResponse> = new Subject<ILoginResponse>();
  private isLoggedIn: boolean;
  private _loginUserName: string;

  constructor(private http: HttpClient, private router: Router, private constHelper: ConstHelperService,
    private zone: NgZone) {
    FB.init({
      appId: '444498579231295',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v2.9',
      status: true
    });

    FB.Event.subscribe('auth.login', r => { this.fbLoginEvent(r); });
    FB.Event.subscribe('auth.logout', r => this.fbLogoutEvent(r));
    FB.Event.subscribe('auth.statusChange', r => this.fbLoginStatusChangeEvent(r));
  }

  get isUserLoggedIn(): boolean {
    this.isLoggedIn = !this.isTokenExpired();
    return this.isLoggedIn;
  }

  get loggedInUserName(): string {
    if (this.isLoggedIn) {
      if (this._loginUserName === '' || this._loginUserName === undefined) {
        return this.getUserNameFromStorage();
      }

      return this._loginUserName;
    }

    return '';
  }

  fbLoginEvent(responseLogin): void {
    // Cookie.delete('fblo_444498579231295')
  }

  fbLogoutEvent(responseLogout): void {
    // Cookie.delete('fblo_444498579231295')
  }

  fbLoginStatusChangeEvent(responseChange) {
    // console.log('statusChangeEvent() called, ')
    // console.dir(response)

    this.isLoggedIn = (responseChange.status === 'connected');
  }

  login(): void {
    this.zone.run(() => {
      this.isLoggedIn = false;
    });

    this.fbLogin();
  }

  // Login to FB
  private fbLogin() {
    FB.login(this.fbLoginResponseHandler.bind(this), {
      scope: 'public_profile, email'
    });
  }

  private fbLoginResponseHandler(response: any) {
    if (response.authResponse === null) {
      this.handleError('Facebook Sign In Failed');
      return;
    }

    const self = this;
    FB.api('/me?fields=name,first_name,last_name', function (response: any) {
      self.zone.run(() => {
        self._loginUserName = response.first_name;
      });
    });


    this.ka32Login(response.authResponse.accessToken).subscribe(
      resp => {},
      error => {
        this.onLoginError(error);
      }
    );
  }

  // make login request to KA32 API Server
  private ka32Login(fbToken: string): Observable<ILoginResponse> {
    const body = { 'AccessToken': fbToken };

    return this.http
      .post<ILoginResponse>(this.constHelper.FBLoginAPIUrl, JSON.stringify(body), { headers: this.headers })
      .pipe(
        tap((resp: any) => {

          const loginResponse: ILoginResponse = {
            isLoggedIn: true,
            errorMessage: undefined,
            ka32JWT: {
              token: resp.token,
              expiration: resp.expiration
            }
          };

          this.zone.run(() => {
            this.isLoggedIn = true;
            this.setUserNameInStorage(this._loginUserName);
          });

          this.postLogin(loginResponse);
          resp = loginResponse;
          return resp;

        }
      ));
  }

  private postLogin(loginResponse: ILoginResponse) {
    this.setToken(loginResponse.ka32JWT.token);
    this.setUserNameInStorage(this._loginUserName);
    this.loginEvent.next(loginResponse);
  }

  private onLoginError(error: Response) {
    let errorMsg = 'Cannot Sign In. ';

    if (error.status === 0) {
      errorMsg += 'Unable to contact KA32 Servers.';
    } else if (error.status === 400 || error.status === 401) {

    }

    this.handleError(errorMsg);
  }

  private handleError(errorMessage: string) {
    const loginResponse: ILoginResponse = {
      isLoggedIn: false,
      errorMessage: errorMessage,
      ka32JWT: undefined
    };

    // Notify the subscribers of isLoggedIn
    this.loginEvent.next(loginResponse);
  }

  logout() {
    this._loginUserName = undefined;
    this.isLoggedIn = false;
    this.deleteToken();
    this.deleteUserNameFromStorage();
    FB.logout();
  }

  private getToken(): string {
    return localStorage.getItem(this.constHelper.JwtStorageKeyName);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.constHelper.JwtStorageKeyName, token);
  }

  public deleteToken(): void {
    localStorage.removeItem(this.constHelper.JwtStorageKeyName);
  }

  private getUserNameFromStorage(): string {
    return localStorage.getItem(this.constHelper.LoginUserFirstNameKeyName);
  }

  private setUserNameInStorage(userName: string): void {
    localStorage.setItem(this.constHelper.LoginUserFirstNameKeyName, userName);
  }

  private deleteUserNameFromStorage(): void {
    localStorage.removeItem(this.constHelper.LoginUserFirstNameKeyName);
  }

  private getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
      if (!token) {
        return true;
      }
    }

    const date = this.getTokenExpirationDate(token);

    if (date === undefined) {
      return true;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

}
