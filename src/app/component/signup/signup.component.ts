// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth-guardss.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupComponent {
//   signupForm: FormGroup;
//   errorMessage: string = '';

 
//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     this.signupForm = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', Validators.required]
//     }, {
//       validator: this.passwordMatchValidator
//     });
//   }

//   // Custom validator for password confirmation
//   passwordMatchValidator(group: FormGroup): any {
//     const password = group.get('password')?.value;
//     const confirmPassword = group.get('confirmPassword')?.value;
//     return password === confirmPassword ? null : { notMatching: true };
//   }

//   onSignup(): void {
//     if (this.signupForm.valid) {
//       const { name, email, password } = this.signupForm.value;
//       this.authService.signup(name, email, password).subscribe(
//         response => {
//           console.log('Signup successful:', response);
//           this.router.navigate(['/login']);  
//         },
//         error => {
//           this.errorMessage = 'Signup failed. Please try again.';
//           console.error('Signup error:', error);
//         }
//       );
//     } else {
//       this.errorMessage = 'Please fill out the form correctly.';
//     }
//   }
// }





import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';
  // private apiUrl = 'https://e428-103-174-35-5.ngrok-free.app';  
  private apiUrl = "https://ce6c-103-174-35-54.ngrok-free.app";
   

  constructor(
    private fb: FormBuilder,  
    private http: HttpClient, 
    private router: Router  
  ) {
    
    this.signupForm = this.fb.group({
      name: ['', Validators.required],  
      email: ['', [Validators.required, Validators.email]],  
      password: ['', [Validators.required, Validators.minLength(6)]],  
      confirmPassword: ['', Validators.required]  
    }, {
      validator: this.passwordMatchValidator  
    });
  }

 
  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  
  onSignup(): void {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;  

     
      this.http.post<any>(`${this.apiUrl}/signup`, { name, email, password }).subscribe(
        response => {
          console.log('Signup successful:', response);
          
          this.router.navigate(['/login']);
        },
        error => {
          this.errorMessage = 'Signup failed. Please try again.'; 
          console.error('Signup error:', error);
        }
      );
    } else {
      this.errorMessage = 'Please fill out the form correctly.';  
    }
  }
}

