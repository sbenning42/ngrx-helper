export interface AppHeaderAction {
    icon: string;
    type: string;
}

export interface AppHeaderState {
    title: string;
    actions: AppHeaderAction[];
}

export const initialAppHeaderState: AppHeaderState = {
    title: 'My App',
    actions: []
}