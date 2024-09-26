import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


export interface AuthResponse {
    token?: string; 
    id?: string;  
    title: string;
    description: string;
    completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://ce6c-103-174-35-54.ngrok-free.app";
  
  private endpoints = {
      signup: `${this.apiUrl}/signup`,
      login: `${this.apiUrl}/login`,
      forgotPassword: `${this.apiUrl}/forgot-password`,
  };

  constructor(private http: HttpClient) { }

  // Signup Method
  signup(name: string, email: string, password: string): Observable<any> {
      const signupData = { name, email, password };
      return this.http.post(this.endpoints.signup, signupData).pipe(
          catchError(error => {
              console.error('Signup error:', error);
              return of(null); 
          })
      );
  }

  // Login Method
  login(email: string, password: string): Observable<AuthResponse | null> {  
      const loginData = { email, password };
      return this.http.post<AuthResponse>(this.endpoints.login, loginData).pipe(
          map(response => {
              if (response?.token) {
                  this.setToken(response.token);
              }
              return response; 
          }),
          catchError(error => {
              console.error('Login error:', error);
              return of(null);
          })
      );
  }

  // Forgot Password Method
  forgotPassword(email: string): Observable<any> {
      const forgotPasswordData = { email };
      return this.http.post(this.endpoints.forgotPassword, forgotPasswordData).pipe(
          catchError(error => {
              console.error('Forgot password error:', error);
              return of(null); 
          })
      );
  }

  // Logout Method
  logout(): void {
      localStorage.removeItem('token');
      
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
      return !!this.getTokenFromStorage();
  }

  // Private methods for token handling
  private setToken(token: string): void {
      localStorage.setItem('token', token);
  }

  private getTokenFromStorage(): string | null {
      return localStorage.getItem('token');
  }
}
