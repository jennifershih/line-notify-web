import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login.component') },
  { path: 'callback', loadComponent: () => import('./pages/callback.component') },
  { path: 'send-message', loadComponent: () => import('./pages/send-message.component') },
  { path: '**', redirectTo: 'login' },
];
