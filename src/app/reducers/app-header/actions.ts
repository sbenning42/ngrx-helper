import { Action } from '@ngrx/store';
import { AppHeaderAction } from './state';

export enum AppHeaderActionTypes {
    setTitle = 'APP_HEADER_SET_TITLE_ACTION',
    setActions = 'APP_HEADER_SET_ACTIONS_ACTION'
}

export class AppHeaderSetTitleAction implements Action {
    type = AppHeaderActionTypes.setTitle;
    constructor(public title: string) {}
}

export class AppHeaderSetActionsAction implements Action {
    type = AppHeaderActionTypes.setActions;
    constructor(public actions: AppHeaderAction[]) {}
}

export type AppHeaderActionUnion = AppHeaderSetTitleAction
|AppHeaderSetActionsAction;