import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule, FooterComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  prefilledEmail: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      email?: string;
      message?: string;
    };
    
    if (state?.email) {
      this.prefilledEmail = state.email;
    }
    if (state?.message) {
      this.errorMessage = state.message;
    }
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: [this.prefilledEmail, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    }, { validator: this.passwordMatchValidator });
  }

  // Custom validator for password matching
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      this.http.post('/api/register', formData).subscribe({
        next: (response: any) => {
          this.successMessage = response.message;
          this.errorMessage = '';
          this.registrationForm.reset();
          setTimeout(() => {
            this.router.navigate(['/login'], {
              state: { 
                email: formData.email,
                message: 'Registration successful! Please login.'
              }
            });
          }, 1500);
        },
        error: (error: any) => {
          this.errorMessage = error.error?.error || 'Registration failed';
          this.successMessage = '';
        },
      });
    } else {
      this.errorMessage = 'Please fill all required fields correctly.';
      this.successMessage = '';
    }
  }

  signInWithGoogle() {
    console.log('Google Sign-In clicked!');
    alert('Google Sign-In button clicked!');
  }
}