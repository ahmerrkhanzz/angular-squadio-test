import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false; // Track loading state

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, // Inject the AuthService
    private router: Router, // Inject the Router for navigation
    private snackBar: MatSnackBar // Inject MatSnackBar for notifications
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // Username field with required validation
      password: ['', Validators.required], // Password field with required validation
    });
  }

  ngOnInit(): void {}

  // Handle form submission
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return; // Do not proceed if the form is invalid
    }

    this.loading = true; // Show loading indicator

    const { username, password } = this.loginForm.value;

    // Call the authentication service
    this.authService.login(username, password).subscribe(
      (response: any) => {
        this.loading = false; // Hide loading indicator

        // Store the JWT token (e.g., in localStorage or sessionStorage)
        localStorage.setItem('authToken', response.accessToken);

        // Redirect to the dashboard or home page
        this.router.navigate(['/users']);
      },
      (error: any) => {
        this.loading = false; // Hide loading indicator
        this.snackBar.open(
          'Login failed. Please check your credentials.',
          'Close',
          { duration: 3000 }
        ); // Show error message
      }
    );
  }
}
