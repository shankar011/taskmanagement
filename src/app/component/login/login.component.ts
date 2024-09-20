import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() navigateToSignup = new EventEmitter<void>();
  loginForm: FormGroup;
  private apiUrl = 'https://56fc-103-174-35-4.ngrok-free.app/login';

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

  // Login form submission
  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Call the API for login
      this.http.post<any>(this.apiUrl, { email, password }).subscribe(
        response => {
          if (response.success) {
            // If login is successful, store user info or token
            localStorage.setItem('token', response.token); 
            this.router.navigate(['/dashboard']); 
          } else if (response.firstTimeUser) {
            // If first-time user, redirect to sign-up
            alert('First-time user, please sign up');
            this.goToSignup();
          } else {
            alert('Login failed. Invalid email or password.');
          }
        },
        error => {
          console.error('Login failed', error);
          alert('An error occurred during login.');
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
