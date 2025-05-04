import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { User } from '../../../shared/interfaces/user-model';
import { IAuthResponse } from '../../../shared/models/IAuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUser = signal<User | null>(null);
  public currentUserSignal = computed(() => this.currentUser());

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.initializeCurrentUser();
  }

  public initializeCurrentUser(): void {
    const token = this.tokenService.getToken();
    if (token) {
      const user = this.tokenService.getUserFromStorage();
      this.currentUser.set(user);
    }
  }

  login(userLogin: User): Observable<IAuthResponse> {
    const url = `${this.apiUrl}/auth/login`;
     return this.http.post<IAuthResponse>(url, userLogin).pipe(
      tap((response) => {
        this.tokenService.saveToken(response.token);
        if (response.user) {
          this.tokenService.saveUser(response.user);
          this.currentUser.set(response.user);
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
    this.currentUser.set(null);
    this.router.navigate(['auth/login']);
  }

  isAuthenticated(): boolean {
    return this.tokenService.isAuthenticated();
  }
}