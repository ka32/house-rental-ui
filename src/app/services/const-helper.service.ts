import { Injectable } from '@angular/core';

@Injectable()
export class ConstHelperService {
  // readonly RentalAPIBaseUrl = 'https://ka32apitest001.azurewebsites.net/api/'
  readonly RentalAPIBaseUrl = 'https://localhost:44322/api/';
  readonly HomeTypeAPIUrl = this.RentalAPIBaseUrl + 'HomeType?v1';
  readonly AreaAPIUrl = this.RentalAPIBaseUrl + 'Area/City/1';
  readonly FurnishTypeAPIUrl = this.RentalAPIBaseUrl + 'FurnishType';
  readonly HomePostAPIUrl = this.RentalAPIBaseUrl + 'HomePost';
  readonly GetMyPostsAPIUrl = this.RentalAPIBaseUrl + 'HomePost/GetMyPosts';
  readonly GetMyPostAPIUrl = this.RentalAPIBaseUrl + 'HomePost/GetMyPost';
  readonly DeletePostAPIUrl = this.RentalAPIBaseUrl + 'HomePost/Delete';
  readonly FBLoginAPIUrl = this.RentalAPIBaseUrl + 'Auth/facebook/login';

  readonly HomePageUrl = '/home';
  readonly SignInPageUrl = '/signIn';
  readonly HelpPageUrl = '/help';
  readonly SearchHomePageUrl = '/search-home';
  readonly AddPostPageUrl = '/add-post';
  readonly ManagePostsPageUrl = '/manage-posts';
  readonly EditPostPageUrl = '/edit-post';

  // CAUTION!  If you change this value, make sure to change in auth-request.service.ts as it doesn't use this constant.
  readonly JwtStorageKeyName: string = 'ka_xrc';
  readonly LoginUserFirstNameKeyName: string = 'ka_l_fn';

  readonly PageTitle = 'KA32.in - Homes for Rent in Kalaburagi';

  constructor() { }

}
