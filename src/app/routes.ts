import {Routes} from '@angular/router';
import {SearchHomeComponent} from './components/search-home/search-home.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
// import {SemanticCssComponent} from './components/static-files/semantic-css.component';
// import {SavePostComponent} from './components/save-post/save-post.component';
// import {LoginComponent} from './components/login/login.component';
// import {AuthGuardService} from './services/auth-guard.service';
// import {AnonymousAuthGuardSerivce} from './services/anonymous-auth-guard-serivce';
import {HomeComponent} from './components/home/home.component';

export const appRoutes: Routes = [
  // {
  // path: 'signIn', component: LoginComponent,
  // canActivate: [AnonymousAuthGuardSerivce]
  // },
  { path: 'search-home', component: SearchHomeComponent },
  // {
  // path: 'add-post', component: SavePostComponent,
  // canActivate: [AuthGuardService]
  // },
  { path: 'search-home/:id', component: SearchHomeComponent },
  { path: 'home', component: HomeComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];
