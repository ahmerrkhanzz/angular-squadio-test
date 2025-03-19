import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService, private router: Router) {}

  // Get the token from localStorage
  getToken(): string | null {
    const token = localStorage.getItem('authToken');
    console.log('Retrieved Token:', token);
    return token;
  }

  login(username: string, password: string): Observable<ApiResponse<any>> {
    return this.apiService.post<any>('login', { username, password });
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); // Check if the token exists
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('authToken'); // Remove the token
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
