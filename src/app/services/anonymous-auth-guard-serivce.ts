import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { ConstHelperService } from './const-helper.service';

@Injectable()
export class AnonymousAuthGuardSerivce implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private constHelper: ConstHelperService) {
  }

  canActivate() {
    if (this.authService.isTokenExpired()) {
      return true;
    }

    this.router.navigate([this.constHelper.HomePageUrl]);
    return false;
  }
}
