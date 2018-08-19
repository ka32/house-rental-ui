import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { IHomeType } from './../models/home-type.model';
import { ConstHelperService } from './../services/const-helper.service';

/*
export const HomeTypes: IHomeType[] = [
  { id: 1, name: '1 Room'},
  { id: 2, name: '1 RK'},
  { id: 3, name: '1 BHK'},
  { id: 4, name: '2 BHK'},
  { id: 5, name: '3 BHK'},
  { id: 6, name: '4 BHK'}
];*/

@Injectable()
export class HomeTypeService {
  constructor(private http: HttpClient, private constHelperSvc: ConstHelperService) { }

  getHomeTypes(): Observable<IHomeType[]> {
    return this.http.get<IHomeType[]>(this.constHelperSvc.HomeTypeAPIUrl)
                    .pipe(
                      retry(3),
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

      console.error('An error occurred while fetching home types', exception); // for demo purposes only

      return throwError('Something went wrong while fetching home types list');
  }

}
