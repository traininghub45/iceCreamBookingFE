import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly tokenKey = environment.jwtTokenKey;

  constructor(private jwtHelper: JwtHelperService) {}

  /**
   * Retrieves the JWT token from localStorage.
   * @returns The JWT token as a string, or null if not found.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Checks if the user is authenticated by verifying the presence and validity of the token.
   * @returns True if the token exists and is not expired, otherwise false.
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  /**
   * Retrieves the user's role from the JWT token.
   * @returns The user's role as a string, or an empty string if the token is invalid or does not contain a role.
   */
  getUserRole(): string {
    const token = this.getToken();
    if (!token) return '';

    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role || ''; // Adjust based on your JWT structure
    } catch (error) {
      console.error('Failed to decode token:', error);
      return '';
    }
  }

  /**
   * Saves the JWT token to localStorage.
   * @param token The JWT token as a string.
   */
  saveToken(token: string): void {
    if (typeof token === 'string') {
      localStorage.setItem(this.tokenKey, token);
    } else {
      console.error('Attempted to save a non-string token');
    }
  }

  /**
   * Clears the JWT token from localStorage.
   */
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
