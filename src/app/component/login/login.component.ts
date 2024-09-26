import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() navigateToSignup = new EventEmitter<void>();
  loginForm: FormGroup;
  
   
  private apiUrl = "https://ce6c-103-174-35-54.ngrok-free.app";

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  
  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      console.log('Attempting to log in with:', { email, password }); 
  
      
      this.http.post<any>(`${this.apiUrl}/login`, { email, password }, {
        headers: { 'Content-Type': 'application/json' } 
      }).subscribe(
        response => {
          console.log('Login response:', response);  
          
         
          if (response.token) {
            localStorage.setItem('token', response.token); 
            this.router.navigate(['/dashboard']); 
          } else {
            alert('Login failed. Invalid email or password.');
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Login failed', error);
          if (error.status === 400) {
            alert('Bad Request: Invalid email or password.');
          } else {
            alert('An error occurred during login.');
          }
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}

