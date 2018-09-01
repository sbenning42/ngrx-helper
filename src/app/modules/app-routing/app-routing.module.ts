import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';

import { PageNotFoundComponent } from '../../components/page-not-found/page-not-found.component';
import { HomePageComponent } from '../../components/home-page/home-page.component';
import { ReduxHelperPageComponent } from '../../components/redux-helper-page/redux-helper-page.component';

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'helper', component: ReduxHelperPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }