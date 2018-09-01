import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppHeaderSetTitleAction, AppHeaderSetActionsAction, AppHeaderState } from './reducers/app-header';
import { AppHeaderControllerService } from './services/app-header-controller.service';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  ready: boolean = false;

  subscription: Subscription;

  constructor(
    public appHeaderCtrl: AppHeaderControllerService,
    public router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.appHeaderCtrl.header$.subscribe((appHeader: AppHeaderState) => {
      if (appHeader.title && appHeader.actions.length > 0) {
        this.ready = true;
        this.subscription.unsubscribe();
        this.subscription = undefined;
      }
    });
    this.appHeaderCtrl.registerAction('goHome', () => {
      this.appHeaderCtrl.setTitle('Home');
      this.router.navigate(['home']);
    });
    this.appHeaderCtrl.registerAction('goHelper', () => {
      this.appHeaderCtrl.setTitle('Helper');
      this.router.navigate(['helper']);
    });
    this.appHeaderCtrl.setTitle('Redux App');
    this.appHeaderCtrl.setActions([
      {icon: 'home', type: 'goHome'},
      {icon: 'create', type: 'goHelper'},
    ]);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
