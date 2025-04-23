import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { IAuthResponse } from '../../models/IAuthResponse';
import { User } from '../../interfaces/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService // Use TokenService for token management
  ) {
    // Initialize user from storage if token exists
    this.initializeCurrentUser();
  }

  private initializeCurrentUser(): void {
    const token = this.tokenService.getToken();
    if (token) {
      const user = this.tokenService.getUserFromToken(token);
      this.currentUserSubject.next(user);
    }
  }

  login(userLogin: User): Observable<IAuthResponse> {
    const url = `${this.apiUrl}/auth/login`;
     return this.http.post<IAuthResponse>(url, userLogin).pipe(
      tap((response) => {
        this.tokenService.saveToken(response.token);
        if (response.user) {
          this.tokenService.saveUser(response.user);
          this.currentUserSubject.next(response.user);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.tokenService.clearToken();
    this.tokenService.clearUser();
    this.currentUserSubject.next(null);
    this.router.navigate(['auth/login']);
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.tokenService.isAuthenticated();
  }
}