// auth.interceptor.ts
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Use inject() to get the service
  console.log('Interceptor triggered for:', req.url); // Debugging

  // Get the auth token from the service
  const authToken = authService.getToken();
  console.log('Intercepting Request:', req.url); // Debugging

  // Clone the request and add the authorization header
  if (authToken && !isPublicRequest(req)) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Pass the cloned request to the next handler
    console.log('Adding Authorization Header'); // Debugging
    return next(authReq);
  }

  // Pass the original request if no token is available or it's a public request
  return next(req);
};

// Check if the request is public (e.g., login, public APIs)
const isPublicRequest = (req: HttpRequest<unknown>): boolean => {
  const publicEndpoints = ['login']; // Example: Login endpoint

  // Check if the request URL matches any public endpoint
  return publicEndpoints.some((endpoint) => req.url.includes(endpoint));
};
