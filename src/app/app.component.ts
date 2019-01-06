import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConstHelperService } from './services/const-helper.service';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router, public constHelper: ConstHelperService, private authService: AuthService) {
  }

  get isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn;
  }

  get loggedInUserName(): string {
    return this.authService.loggedInUserName;
  }

  logout() {
    this.authService.logout();
    this.router.navigate([this.constHelper.HomePageUrl]);
  }

}
