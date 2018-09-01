import { AppHeaderState, initialAppHeaderState } from "./state";
import { AppHeaderActionUnion, AppHeaderActionTypes, AppHeaderSetTitleAction, AppHeaderSetActionsAction } from "./actions";

export function appHeaderReducer(state: AppHeaderState = initialAppHeaderState, action: AppHeaderActionUnion): AppHeaderState {
    switch (action.type) {
        case AppHeaderActionTypes.setTitle:
            return {...state, title: (<AppHeaderSetTitleAction>action).title};
        case AppHeaderActionTypes.setActions:
            return {...state, actions: (<AppHeaderSetActionsAction>action).actions};
        default:
            return state;
    }
}