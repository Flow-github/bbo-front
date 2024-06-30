import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, map, of } from "rxjs";
import { LoginSelector } from "../reducer-login/login.selector";

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{

    constructor(private store: Store, private router: Router){}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.checkConnexion();
    }

    private checkConnexion(): Observable<boolean | UrlTree>{
        const selectStoreResult: Observable<boolean> = this.store.select(LoginSelector.SELECT_LOGIN_RESULT);
        return selectStoreResult.pipe(map((result: boolean) => this.checkResult(result)));
    }

    private checkResult(result: boolean): boolean | UrlTree{
        return result || this.router.parseUrl('/login');
    }

}