import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { LoginState } from "../interfaces/loginState";
import { LoginAction } from "./login.action";

export class LoginReducer{

    private static readonly INITIAL_STATE: LoginState = { isLogin: false, error: '' };

    public static readonly LOGIN_REDUCER: ActionReducer<LoginState, Action> = createReducer(LoginReducer.INITIAL_STATE,
        on(LoginAction.LOGIN, (loginState: LoginState, action: Action) => ({isLogin: loginState.isLogin, error: '', state: action})),
        on(LoginAction.LOGOUT, (loginState: LoginState, action: Action) => ({isLogin: loginState.isLogin, error: '', state: action})),
        on(LoginAction.LOGIN_SUCESS, (loginState: LoginState, action: Action) => ({isLogin: (action as any).isLogin, error: loginState.error, state: action})),
        on(LoginAction.LOGIN_ERROR, (loginState: LoginState, action: Action) => ({isLogin: false, error: (action as any).error, state: action}))
    );
}