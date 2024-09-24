import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('token');
    console.log('AuthGuard - isLoggedIn:', isLoggedIn);
    if (!isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
  
}
