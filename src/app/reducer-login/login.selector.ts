import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginState } from "../interfaces/loginState";

export class LoginSelector{

    public static readonly SELECT_LOGIN_FEATURE = createFeatureSelector<LoginState>('login');

    public static readonly SELECT_LOGIN_RESULT = createSelector(
        LoginSelector.SELECT_LOGIN_FEATURE,
        (state: LoginState) => state.isLogin
    );

    public static readonly SELECT_LOGIN_ERROR = createSelector(
        LoginSelector.SELECT_LOGIN_FEATURE,
        (state: LoginState) => state.error
    );

}