import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/chat/chat.component').then(m => m.ChatComponent), canActivate: [AuthGuard]},
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)},
    { path: "**", redirectTo: "" }
];
