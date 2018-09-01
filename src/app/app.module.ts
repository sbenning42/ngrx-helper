import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '../../node_modules/@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environemnt

import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { MaterialLoaderModule } from './modules/material-loader/material-loader.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppHeaderControllerService } from './services/app-header-controller.service';
import { appHeaderReducer } from './reducers/app-header';
import { ReduxHelperFormComponent } from './components/redux-helper-form/redux-helper-form.component';
import { ReduxHelperPageComponent } from './components/redux-helper-page/redux-helper-page.component';

/*
import { Observable, of, merge } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
*/

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomePageComponent,
    AppHeaderComponent,
    ReduxHelperFormComponent,
    ReduxHelperPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialLoaderModule,
    StoreModule.forRoot({
      router: routerReducer,
      appHeader: appHeaderReducer
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [
    AppHeaderControllerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
