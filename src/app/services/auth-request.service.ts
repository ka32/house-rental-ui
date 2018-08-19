import { Headers, BaseRequestOptions, RequestOptionsArgs, RequestOptions } from '@angular/http';

const AuthHeaderKey = 'Authorization';
const AuthPrefix = 'Bearer';

export class AuthRequestOptions extends BaseRequestOptions {

  constructor() {
    super();

    const token = this.getTokenFromLocalStorage();

    if (token) {
      this.headers.append(AuthHeaderKey, `${AuthPrefix} ${token}`);
    }
  }

  merge(options?: RequestOptionsArgs): RequestOptions {
    const newOptions = super.merge(options);
    const token = this.getTokenFromLocalStorage();

    if (token) {
      newOptions.headers.set(AuthHeaderKey, `${AuthPrefix} ${this.getTokenFromLocalStorage()}`);
    }

    return newOptions;
  }

  private getTokenFromLocalStorage(): string {
    return localStorage.getItem('ka_xrc');
  }

}
