
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstHelperService } from './../services/const-helper.service';
import { IFurnishType } from './../models/furnish-type.model';
import { retry, catchError } from 'rxjs/operators';
@Injectable()
export class FurnishTypeService {

  constructor(private constHelperSvc: ConstHelperService, private http: HttpClient) { }

  getFurnishTypes(): Observable<IFurnishType[]> {
    return this.http.get<IFurnishType[]>(this.constHelperSvc.FurnishTypeAPIUrl)
      .pipe(
        retry(2), // retry a failed request upto 3 times
        catchError(this.handleError)
      );
  }

  private handleError(error: Response) {
    console.error('An error occurred', error); // for demo purposes only
    return observableThrowError(error);
  }

}
