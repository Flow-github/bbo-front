import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoginAction } from '../../reducer-login/login.action';
import { LoginSelector } from '../../reducer-login/login.selector';
import { Observable, Subscription, filter } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy{

  @ViewChild('inputLogin') inputLogin: ElementRef;
  @ViewChild('inputPass') inputPass: ElementRef;

  private subList: Subscription;

  public labelError: string;

  constructor(private store: Store, private router: Router){
    
  }

  public ngOnInit(): void {
    const selectStoreResult: Observable<boolean> = this.store.select(LoginSelector.SELECT_LOGIN_RESULT);
    this.subList = selectStoreResult.pipe(filter((value: boolean) => value)).subscribe((result: boolean) => {this.onLoginResult(result)});

    const selectStoreError: Observable<string> = this.store.select(LoginSelector.SELECT_LOGIN_ERROR);
    this.subList.add(selectStoreError.subscribe((error: string) => {this.onLoginError(error)}));
  }

  public ngOnDestroy(): void {
    this.subList.unsubscribe();
  }

  public sendForm(): void{
    const login: string = this.inputLogin.nativeElement.value;
    const pass: string = this.inputPass.nativeElement.value;
    this.store.dispatch({type: LoginAction.LOGIN.type, login: login, password: pass});
  }

  private onLoginResult(result: boolean): void{
    this.router.navigateByUrl('');
  }

  private onLoginError(error: string): void{
    this.labelError = error;
  }

}
