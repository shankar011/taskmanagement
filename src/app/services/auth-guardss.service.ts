import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://56fc-103-174-35-4.ngrok-free.app/'; 

  constructor(private http: HttpClient) { }

  // Signup Method
  signup(name: string, email: string, password: string): Observable<any> {
    const signupData = { name, email, password };
    return this.http.post(`${this.apiUrl}/signup`, signupData);
  }

  // Login Method
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      map((response: any) => {
        if (response && response.token) {
    
          localStorage.setItem('token', response.token);
        }
        return response;
      })
    );
  }

  // Forgot Password Method
  forgotPassword(email: string): Observable<any> {
    const forgotPasswordData = { email };
    return this.http.post(`${this.apiUrl}/forgot-password`, forgotPasswordData);
  }

  // Logout Method
  logout(): void {
    localStorage.removeItem('token');
  }

  // Check if user is authenticated by verifying if a token exists in localStorage
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Get Token (if needed for further authorization headers)
  getToken(): string | null {
    return localStorage.getItem('token');
  }

}
