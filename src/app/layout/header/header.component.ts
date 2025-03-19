import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout(); // Call the logout method from the AuthService
  }
}
