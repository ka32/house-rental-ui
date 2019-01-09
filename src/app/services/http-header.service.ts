const AuthHeaderKey = 'Authorization';
const AuthPrefix = 'Bearer';
import { HttpHeaders } from '@angular/common/http';
export class HttpHeaderService {
  constructor() {}

  getHeader(): any {
    const token = this.getTokenFromLocalStorage();

    if (token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `${AuthPrefix} ${this.getTokenFromLocalStorage()}`
        })
      };

      return httpOptions;
    }

    const basicHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return basicHttpOptions;
  }

  private getTokenFromLocalStorage(): string {
    return localStorage.getItem('ka_xrc');
  }
}
