import { catchError, retry, retryWhen } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { IArea } from './../models/area.model';
import { IHomeType } from './../models/home-type.model';
import { IHomePost } from './../models/home-post.model';
import { ConstHelperService } from './../services/const-helper.service';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable()
export class SearchHomeService {

  selectedArea: number;
  selectedHomeType: number;

  constructor(private http: HttpClient, private constHelperSvc: ConstHelperService) { }

  getHomePosts(areaId: number, homeTypeId: number): Observable<IHomePost[]> {
    const params = '?areaId=' + areaId + '&homeTypeId=' + homeTypeId;

    return this.http.get<IHomePost[]>(this.constHelperSvc.HomePostAPIUrl + params)
      .pipe(
        retry(3), // retry a failed request upto 3 times
        catchError(this.handleError)
      );

  }

  private handleError(exception: HttpErrorResponse) {
    if (exception.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
    }

    console.error('An error occurred while fetching posts', exception); // for demo purposes only

    return throwError('Something went wrong while fetching posts list');
  }
}
