import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { ConstHelperService } from './../../services/const-helper.service';
import { ILoginResponse } from './../../models/login-reponse';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SnackBarService } from 'src/app/services/snack-bar.service';
declare const AccountKit: any;

import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import { ThirdPartyObjectsService } from 'src/app/services/third-party-objects.service';
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
    private snackBarService: SnackBarService,
    private thirdPartyObjects: ThirdPartyObjectsService
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

  firebaseLogin() {
    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: "AIzaSyAYp9ZacigFaW6cO_KwhFjAr_tkAoweNBI",
        authDomain: "ka32.in",
        databaseURL: "https://ka32webclient.firebaseio.com",
        projectId: "ka32webclient",
        storageBucket: "ka32webclient.appspot.com",
        messagingSenderId: "632763093824",
        appId: "1:632763093824:web:4a47e402c696941eeba0a5"
      };

      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      // Initialize the FirebaseUI Widget using Firebase.
      this.thirdPartyObjects.FirebaseAuthUI = new firebaseui.auth.AuthUI(firebase.auth());

    }

    // FirebaseUI config.
    const uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: 'google.co.in',
      signInOptions: [
        {
          provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          recaptchaParameters: {
            type: 'image', // 'audio'
            size: 'invisible', // 'invisible' or 'compact'
            badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
          },
          defaultCountry: 'IN',
          loginHint: '',
          whitelistedCountries: ['IN', '+91']
        }
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback function.
      // Terms of service url/callback.
      tosUrl: '<your-tos-url>',
      // Privacy policy url/callback.
      privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>');
      },
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          var user = authResult.user;
          var credential = authResult.credential;
          var isNewUser = authResult.additionalUserInfo.isNewUser;
          var providerId = authResult.additionalUserInfo.providerId;
          var operationType = authResult.operationType;
          // Do something with the returned AuthResult.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        signInFailure: function (error) {
          // Some unrecoverable error occurred during sign-in.
          // Return a promise when error handling is completed and FirebaseUI
          // will reset, clearing any UI. This commonly occurs for error code
          // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
          // occurs. Check below for more details on this.
          // return handleUIError(error);
          return error;
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          //document.getElementById('loader').style.display = 'none';
        }
      }
    };

    // The start method will wait until the DOM is loaded.
    this.thirdPartyObjects.FirebaseAuthUI.start('#firebaseui-auth-container', uiConfig);
  }
}
