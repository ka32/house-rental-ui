/*
export const Areas: IArea[] = [
  {areaId: 1, name: 'Adarsh Nagar'},
  {areaId: 2, name: 'Aland Naka'},
  {areaId: 3, name: 'Arihanth Nagar'},
  {areaId: 4, name: 'Bank Colony'}, {areaId: 5, name: 'Bapuji Nagar'}, {areaId: 6, name: 'Basaveshwar Colony'},
  {areaId: 7, name: 'Vidya Nagar'}, {areaId: 8, name: 'Yadulla Colony'},  {areaId: 9, name: 'Bhagyavanti Nagar'},
  {areaId: 10, name: 'Bhavani Nagar'}, {areaId: 11, name: 'Biddapur Colony'}, {areaId: 12, name: 'Brahmpur'},
  {areaId: 13, name: 'Darga Road'}, {areaId: 14, name: 'Devi Nagar'}, {areaId: 15, name: 'Dubai Colony'},
  {areaId: 16, name: 'G Road'}, {areaId: 17, name: 'Gazipur'}, {areaId: 18, name: 'Ganesh Mandir'}, {areaId: 19, name: 'Ganesh Nagar'},
  {areaId: 20, name: 'GDA Colony'}, {areaId: 21, name: 'Godutai Colony'}, {areaId: 22, name: 'Siddeshwar Nagar'},
  {areaId: 23, name: 'Jaya Nagar'}, {areaId: 24, name: 'Jewargi Colony'}, {areaId: 25, name: 'Jewargi Cross'},
  {areaId: 26, name: 'Kailas Nagar'}, {areaId: 27, name: 'Kantha Colony'}, {areaId: 28, name: 'Khadri Chowk'},
  {areaId: 29, name: 'Khamar Nagar'}, {areaId: 30, name: 'Khuba Plot'}, {areaId: 31, name: 'Kothambri Layout'},
  {areaId: 32, name: 'Kothari Bhavan'}, {areaId: 33, name: 'Madina Colony'}, {areaId: 34, name: 'Mahboob Nagar'},
  {areaId: 35, name: 'Maktampur'}, {areaId: 36, name: 'Manikeshwar Nagar'}, {areaId: 37, name: 'Milan Chowk'},
  {areaId: 38, name: 'MSK Mill'}, {areaId: 39, name: 'Om Nagar'}, {areaId: 40, name: 'Other'},
  {areaId: 41, name: 'P & T Colony'},
  {areaId: 42, name: 'Pooja Colony'}, {areaId: 43, name: 'Pragati Colony'}, {areaId: 44, name: 'Prashant Nagar'},
  {areaId: 45, name: 'Raghavendra Nagar'}, {areaId: 46, name: 'Raimath Nagar'}, {areaId: 47, name: 'Rajapur'},
  {areaId: 48, name: 'Ram Mandir'}, {areaId: 49, name: 'Revensiddeshwar Colony'}, {areaId: 50, name: 'Roja'},
  {areaId: 51, name: 'S T B T'}, {areaId: 52, name: 'Sampta Colony'}, {areaId: 53, name: 'Sangameshwar Colony'},
  {areaId: 54, name: 'Santosh Colony'}, {areaId: 55, name: 'Shah Bazar'}, {areaId: 56, name: 'Shakthi Nagar'},
  {areaId: 57, name: 'Shanthi Nagar'}, {areaId: 58, name: 'Shivaji Nagar'}, {areaId: 59, name: 'Tilak Nagar'}
];
*/
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { IArea } from './../models/area.model';
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
export class AreaService {
  constructor(private http: HttpClient, private constHelperSvc: ConstHelperService) { }

  getAreas(): Observable<IArea[]> {
    return this.http.get<IArea[]>(this.constHelperSvc.AreaAPIUrl)
                    .pipe(
                      retry(2), // retry a failed request upto 3 times
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

    console.error('An error occurred while fetching areas', exception); // for demo purposes only

    return throwError('Something went wrong while fetching areas list');
  }

}
