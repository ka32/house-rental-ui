import { Routes } from '@angular/router';
import { SearchHomeComponent } from './components/search-home/search-home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {AddPostComponent} from './components/post-owner/add-post/add-post.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AnonymousAuthGuardSerivce } from './services/anonymous-auth-guard-serivce';
import { AuthGuardService } from './services/auth-guard.service';
import { CanDeactivateManagePostsService } from './services/can-deactivate-add-post.service';
import { ManagePostsComponent } from './components/post-owner/manage-posts/manage-posts.component';

export const appRoutes: Routes = [
  {
    path: 'signIn', component: LoginComponent,
    canActivate: [AnonymousAuthGuardSerivce]
  },
  {
    path: 'add-post', component: AddPostComponent,
    canActivate: [AuthGuardService],
    canDeactivate: [CanDeactivateManagePostsService]
  },
  {
    path: 'manage-posts', component: ManagePostsComponent,
    canActivate: [AuthGuardService],
    canDeactivate: [CanDeactivateManagePostsService]
  },
  { path: 'search-home', component: SearchHomeComponent },
  { path: 'search-home/:id', component: SearchHomeComponent },
  { path: 'home', component: HomeComponent },
  { path: '404', component: PageNotFoundComponent },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];
