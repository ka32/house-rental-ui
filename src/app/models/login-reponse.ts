export interface ILoginResponse {
  isLoggedIn: boolean;
  errorMessage: string;
  ka32JWT: {
    token: string,
    expiration: Date
  };
}
