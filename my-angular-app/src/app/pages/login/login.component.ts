import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
=======
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
>>>>>>> Stashed changes
=======
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
>>>>>>> Stashed changes

@Component({
  selector: 'app-login',
  standalone: true,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
=======
  imports: [CommonModule, RouterModule, FooterComponent],
>>>>>>> Stashed changes
=======
  imports: [CommonModule, RouterModule, FooterComponent],
>>>>>>> Stashed changes
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  
    
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill out the form correctly';
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    const { email, password } = this.loginForm.value;

    this.http.post('/api/login', { email, password })
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.successMessage = response.message || 'Login successful';
          this.errorMessage = '';
          
          // Navigate based on user role
          setTimeout(() => {
            if (response.role === 'admin') {
              this.router.navigate(['/admin-home']);
            } else if (response.role === 'user') {
              this.router.navigate(['/user-home'], { 
                state: { user: response.user } 
              });
            }
          }, 1000);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Login error:', error);
          
          // Check if user doesn't exist based on your backend response
          const errorMsg = error.error?.error?.toLowerCase() || '';
          const statusCode = error.status;
          
          if (statusCode === 400 && errorMsg.includes('user not found')) {
            this.errorMessage = 'User not found. Redirecting to registration...';
            setTimeout(() => {
              this.router.navigate(['/register'], {
                state: {
                  email: this.loginForm.value.email,
                  message: 'Please complete your registration'
                }
              });
            }, 1500);
          } else if (statusCode === 400 && errorMsg.includes('invalid password')) {
            this.errorMessage = 'Invalid password. Please check your credentials.';
          } else {
            // Handle other errors (server error, validation errors, etc.)
            this.errorMessage = error.error?.error || 'Login failed. Please try again.';
          }
        }
      });
  }

  // Helper method to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
}