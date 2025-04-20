// auth.service.ts
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { UserLogin } from '../../interfaces/user-login-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService // Use TokenService for token management
  ) {}

  login(userLogin: UserLogin): Observable<any | boolean> {
    const url = `${this.apiUrl}/auth/login`;

    return this.http.post<any>(url, userLogin).pipe(
      tap((response: any) => {
        this.tokenService.saveToken(response?.token); // Save token using TokenService
      }),
      catchError((error: HttpErrorResponse) => this.handleError(error)) // Use a dedicated error handler
    );
  }

  logout(): void {
    this.tokenService.clearToken();
    this.router.navigate(['/login']); // Redirect to the login page
    console.log('User logged out successfully.');
  }

  // Centralized error handling
  private handleError(error: HttpErrorResponse): Observable<boolean> {
    console.error('Error occurred during login:', error);

    if (error.status === 401) {
      console.error('Unauthorized: Incorrect credentials');
    } else if (error.status === 0) {
      console.error('Network error: Please check your internet connection.');
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }

    // Optionally, you could rethrow the error with throwError(error) if further handling is needed
    return of(false); // Return a default value or further handle as necessary
  }
}
