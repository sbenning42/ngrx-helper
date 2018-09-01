import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AppHeaderAction,
  AppHeaderState,
  AppHeaderSetTitleAction,
  AppHeaderSetActionsAction
} from '../reducers/app-header';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppHeaderControllerService {

  title$: Observable<string>;
  actions$: Observable<AppHeaderAction[]>;
  header$: Observable<AppHeaderState>;

  actions = [];

  constructor(public store: Store<any>) {
    this.header$ = this.store.select('appHeader');
    this.title$ = this.header$.pipe(
      map((appHeaderState: AppHeaderState) => appHeaderState.title)
    );
    this.actions$ = this.header$.pipe(
      map((appHeaderState: AppHeaderState) => appHeaderState.actions)
    );
  }

  setTitle(title: string) {
    this.store.dispatch(new AppHeaderSetTitleAction(title));
  }

  setActions(actions: AppHeaderAction[]) {
    this.store.dispatch(new AppHeaderSetActionsAction(actions));
  }

  registerAction(type: string, action: (action: AppHeaderAction) => void) {
    this.actions.push({type, action});
  }

  action(action: AppHeaderAction) {
    const ac = this.actions.find(a => a.type === action.type);
    ac.action(action);
  }
}
