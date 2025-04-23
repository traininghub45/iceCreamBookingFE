import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../../environments/environment';
import { User } from '../../interfaces/user-model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly tokenKey = environment.jwtTokenKey;
  private readonly userKey = 'currentUser';
  
  constructor(private jwtHelper: JwtHelperService) {}

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  getUserFromToken(token: string): any {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.nameid,
        username: payload.sub,
        email: payload.email
      };
    } catch (e) {
      return null;
    }
  }

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

  saveToken(token: string): void {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  saveUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  clearUser(): void {
    localStorage.removeItem(this.userKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}