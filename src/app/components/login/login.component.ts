import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { ConstHelperService } from './../../services/const-helper.service';
import { ILoginResponse } from './../../models/login-reponse';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showLoader = false;

  constructor(private authService: AuthService, private router: Router,
    private constHelper: ConstHelperService, private zone: NgZone,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Login | ' + this.constHelper.PageTitle);

    this.authService.loginEvent.subscribe(status => {
      this.zone.run(() => {
        this.showLoader = false;

        if (status.isLoggedIn === true) {
          this.router.navigate([this.constHelper.HomePageUrl]);
        } else {
          alert("Error: " + status.errorMessage);
        }
      });
    });
  }

  login() {
    this.showLoader = true;
    this.authService.login();
  }

}
