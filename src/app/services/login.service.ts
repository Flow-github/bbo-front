import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subject, catchError, of } from "rxjs";
import { LoginAction } from "../reducer-login/login.action";

@Injectable({
    providedIn: "root"
})
export class LoginService{

    private _login$: Subject<boolean>;
    private _headers: HttpHeaders;

    public get login$(): Observable<boolean>{
        return this._login$.asObservable();
    }

    constructor(private http:HttpClient, private store: Store){
        this._login$ = new Subject();

        this._headers = new HttpHeaders();
        this._headers = this._headers.append('Content-Type', 'application/json');
    }

    public userLogin(login: string, password: string): void {
        const request$: Observable<any> = this.http.post('http://localhost:3000/login', JSON.stringify({login: login, password: password}), {headers: this._headers, observe: 'response', withCredentials: true});
        request$.pipe(catchError((err: HttpErrorResponse): Observable<HttpErrorResponse> => this.onLoginError(err))).subscribe((data: any) => {this.onLogin(data)});
    }

    private onLogin(data: any): void{
        this._login$.next(data.ok);
    }

    private onLoginError(err: HttpErrorResponse): Observable<HttpErrorResponse>{
        this.store.dispatch({type: LoginAction.LOGIN_ERROR.type, error: err.error.response, isLogin: false});
        return of(err);
    }

}