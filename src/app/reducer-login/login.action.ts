import { Action, ActionCreator, createAction, props } from "@ngrx/store";

export interface SendLogin extends Action{
    login: string;
    password: string;
}

export class LoginAction{
    public static readonly LOGOUT: ActionCreator = createAction('[Login Action] Logout');
    public static readonly LOGIN: ActionCreator = createAction('[Login Action] Login', props<{login: string, password: string}>());
    public static readonly LOGIN_SUCESS: ActionCreator = createAction('[Login Action] Login Sucess', props<{isLogin: boolean}>());
    public static readonly LOGIN_ERROR: ActionCreator = createAction('[Login Action] Login Error', props<{error: string}>());
}