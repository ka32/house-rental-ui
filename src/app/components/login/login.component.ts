import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { ConstHelperService } from './../../services/const-helper.service';
import { ILoginResponse } from './../../models/login-reponse';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SnackBarService } from 'src/app/services/snack-bar.service';
declare const AccountKit: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showLoader = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private constHelper: ConstHelperService,
    private zone: NgZone,
    private titleService: Title,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Login | ' + this.constHelper.PageTitle);

    this.authService.loginEvent.subscribe(status => {
      this.zone.run(() => {
        this.showLoader = false;

        if (status.isLoggedIn === true) {
          this.router.navigate([this.constHelper.HomePageUrl]);
        } else {
          this.snackBarService.showError(status.errorMessage);
        }
      });
    });
  }

  login() {
    this.showLoader = true;
    this.authService.login();
  }

  loginCallback(response) {
    if (response.status === 'PARTIALLY_AUTHENTICATED') {
      let code = response.code;
      let csrf = response.state;
      // Send code to server to exchange for access token
    } else if (response.status === 'NOT_AUTHENTICATED') {
      // handle authentication failure
    } else if (response.status === 'BAD_PARAMS') {
      // handle bad parameters
    }
  }

  phoneLogin() {
    const countryCode = '+91'; // document.getElementById('country_code');
    const phoneNumber = ''; // document.getElementById('phone_number');
    AccountKit.login(
      'PHONE',
      { countryCode: countryCode, phoneNumber: phoneNumber }, // will use default values if not specified
      this.loginCallback
    );
  }
}
