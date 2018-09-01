import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppHeaderControllerService } from '../../services/app-header-controller.service';

import { Subscription } from 'rxjs';
import { AppHeaderState, AppHeaderAction } from '../../reducers/app-header';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  title: string;
  actions: AppHeaderAction[];

  constructor(public appHeaderCtrl: AppHeaderControllerService) { }

  ngOnInit() {
    this.subscription = this.appHeaderCtrl.header$.subscribe((appHeader: AppHeaderState) => {
      this.title = appHeader.title;
      this.actions = appHeader.actions;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  react(action: AppHeaderAction) {
    this.appHeaderCtrl.action(action);
  }

}
