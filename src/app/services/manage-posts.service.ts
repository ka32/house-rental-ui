import { throwError as observableThrowError, Observable, ObservableInput } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstHelperService } from './const-helper.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpHeaderService } from './http-header.service';
import { GridAreaDirective } from '@angular/flex-layout/grid/typings/area/area';
import { IHomePost } from '../models/home-post.model';
@Injectable()
export class ManagePostsService {
  area: number;
  homeType: number;
  furnishType: number;
  sqFt: number;
  rent: number;
  deposit: number;
  addressPremiseName: string;
  addressStreet: string;
  contactPerson: string;
  contactPhone: string;

  canDeactivate = true;

  constructor(
    private http: HttpClient,
    private constHelper: ConstHelperService,
    private zone: NgZone,
    private router: Router,
    private authService: AuthService,
    private httpHeaderService: HttpHeaderService
  ) { }

//#region "Util functions"
  convertNumberToWords(amount): string {
    if (amount.indexOf('-') > -1) {
      return '';
    }

    const words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    const atemp = amount.split('.');
    const number = atemp[0].split(',').join('');
    const n_length = number.length;
    let words_string = '';
    if (n_length <= 9) {
      const n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
      const received_n_array = new Array();
      for (let i = 0; i < n_length; i++) {
        received_n_array[i] = number.substr(i, 1);
      }
      for (let i = 9 - n_length, j = 0; i < 9; i++, j++) {
        n_array[i] = received_n_array[j];
      }
      for (let i = 0, j = 1; i < 9; i++, j++) {
        if (i === 0 || i === 2 || i === 4 || i === 7) {
          if (n_array[i] === 1) {
            // tslint:disable-next-line:radix
            n_array[j] = 10 + parseInt(n_array[j].toString());
            n_array[i] = 0;
          }
        }
      }
      let value = '';
      for (let i = 0; i < 9; i++) {
        if (i === 0 || i === 2 || i === 4 || i === 7) {
          value = (n_array[i] * 10).toString();
        } else {
          value = n_array[i].toString();
        }
        if (value !== '0' && words[value] !== undefined) {
          words_string += words[value] + ' ';
        }
        if (
          (i === 1 && value !== '0') ||
          (i === 0 && value !== '0' && n_array[i + 1] === 0)
        ) {
          if (value.toString() === '1') {
            words_string += 'Crore ';
          } else {
            words_string += 'Crores ';
          }
        }
        if (
          (i === 3 && value !== '0') ||
          (i === 2 && value !== '0' && n_array[i + 1] === 0)
        ) {
          if (value.toString() === '1') {
            words_string += 'Lakh ';
          } else {
            words_string += 'Lakhs ';
          }
        }
        if (
          (i === 5 && value !== '0') ||
          (i === 4 && value !== '0' && n_array[i + 1] === 0)
        ) {
          words_string += 'Thousand ';
        }
        if (i === 6 && value !== '0' && n_array[i + 2] !== 0) {
          words_string += 'Hundred and ';
        } else if (i === 6 && value !== '0') {
          words_string += 'Hundred ';
        }
      }
      words_string = words_string.split('  ').join(' ');
    }

    return words_string;
  }
//#endregion

//#region "Public functions"
  public createPost(homePost): Observable<any> {
    console.log(homePost);

    const homePostBody = JSON.parse(JSON.stringify(homePost));

    homePostBody.areaId = this.getAreaId(homePost);
    homePostBody.homeTypeId = this.getHomeTypeId(homePost);

    return this.http
      .post<Response>(
        this.constHelper.HomePostAPIUrl,
        homePostBody,
        this.httpHeaderService.getHeader()
      )
      .pipe(
        catchError(error => this.onFailedSave(error))
      );
  }

  public updatePost(homePost: IHomePost): Observable<any> {
    console.log(homePost);

    const homePostBody = JSON.parse(JSON.stringify(homePost));

    homePostBody.areaId = this.getAreaId(homePost);
    homePostBody.homeTypeId = this.getHomeTypeId(homePost);

    return this.http
      .put<Response>(
        this.constHelper.HomePostAPIUrl,
        homePostBody,
        this.httpHeaderService.getHeader()
      )
      .pipe(
        catchError(error => this.onFailedSave(error))
      );
  }

  public getMyPosts(): Observable<any> {
    const posts = this.http.get(
      this.constHelper.GetMyPostsAPIUrl,
      this.httpHeaderService.getHeader()
    )
      .pipe(
        catchError(error => {
          console.error('An error occured while in getMyPosts()', error); // DEBUG
          if (error.status === 401) {
            this.zone.run(() => {
              this.authService.deleteToken();
              this.authService.isTokenExpired();
              this.router.navigate([this.constHelper.SignInPageUrl]);
            });
          }

          return observableThrowError(error);
        })
    );

    return posts;
  }

  public getMyPost(postId: number): Observable<any> {
    const post = this.http.get(
      this.constHelper.GetMyPostAPIUrl + '/' + postId,
      this.httpHeaderService.getHeader()
    )
      .pipe(
        catchError(error => {
          console.error('An error occured while in getMyPost()', error); // DEBUG
          if (error.status === 401) {
            this.zone.run(() => {
              this.authService.deleteToken();
              this.authService.isTokenExpired();
              this.router.navigate([this.constHelper.SignInPageUrl]);
            });
          }

          return observableThrowError(error);
        })
    );

    return post;
  }

  public deletePost(postId: number): Observable<any> {
    return this.http.delete(
      this.constHelper.HomePostAPIUrl + '/' + postId,
      this.httpHeaderService.getHeader()
    )
      .pipe(
        catchError(error => {
          console.error('An error occured while in deletePost()', error); // DEBUG
          if (error.status === 401) {
            this.zone.run(() => {
              this.authService.deleteToken();
              this.authService.isTokenExpired();
              this.router.navigate([this.constHelper.SignInPageUrl]);
            });
          }

          return observableThrowError(error);
        })
    );
  }
//#endregion

//#region Private functions
  private getAreaId(homePost: any): number {
    if (homePost.areaId.areaId !== undefined) {
      return homePost.areaId.areaId;
    } else {
      return homePost.areaId;
    }
  }

  private getHomeTypeId(homePost: any): number {
    if (homePost.homeTypeId.homeTypeId !== undefined) {
      return homePost.homeTypeId.homeTypeId;
    } else {
      return homePost.homeTypeId;
    }
  }

  private onFailedSave(error: any): ObservableInput<any> {
    {
      console.error('An error occurred in createPost or updatePost()', error); // DEBUG
      if (error.status === 401) {
        this.zone.run(() => {
          this.authService.deleteToken();
          this.authService.isTokenExpired();
          this.router.navigate([this.constHelper.SignInPageUrl]);
        });
      }

      return observableThrowError(error);
    }
  }
//#endregion
}
