import { Observable, map, switchMap } from "rxjs";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { LoginAction, SendLogin } from "./login.action";
import { LoginService } from "../services/login.service";
import { inject } from "@angular/core";

export class LoginEffect{

    private actions$: Actions;
    private loginService: LoginService;

    public login$: Observable<Action>; 

    constructor(){
        this.actions$ = inject(Actions);
        this.loginService = inject(LoginService);
        this.login$ = createEffect(() => this.actions$.pipe(
            ofType(LoginAction.LOGIN.type),
            switchMap((action: Action) => {
                const params: SendLogin = action as SendLogin;
                this.loginService.userLogin(params.login, params.password);
                return this.loginService.login$;
            }),
            map((result: boolean) => {
                return {type: LoginAction.LOGIN_SUCESS.type, isLogin: result, error: ''};
            })
        ));
    }

}