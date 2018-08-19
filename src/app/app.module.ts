import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CustomMaterialModule } from './CustomMaterial.module';
import { RouterModule, Routes } from '@angular/router';
import { ConstHelperService } from './services/const-helper.service';
import { appRoutes } from './routes';
import { HomeComponent } from './components/home/home.component';
import { AnonymousAuthGuardSerivce } from './services/anonymous-auth-guard-serivce';
import { AuthGuardService } from './services/auth-guard.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchHomeComponent } from './components/search-home/search-home.component';
import { SearchHomeResultsComponent } from './components/search-home-results/search-home-results.component';
import { AreaService } from './services/area.service';
import { HomeTypeService } from './services/home-type.service';
import { SearchHomeService } from './services/search-home.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, PageNotFoundComponent, SearchHomeComponent, SearchHomeResultsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule, FlexLayoutModule, CustomMaterialModule, HttpClientModule
  ],
  providers: [ConstHelperService, AuthGuardService, AnonymousAuthGuardSerivce, HomeTypeService,
    AreaService, SearchHomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
