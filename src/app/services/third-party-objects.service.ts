import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThirdPartyObjectsService {

  private firebaseAuthUI;

  constructor() { }

   public get FirebaseAuthUI() {
    return this.firebaseAuthUI;
   }

  public set FirebaseAuthUI(value) {
    this.firebaseAuthUI = value;
  }

}
