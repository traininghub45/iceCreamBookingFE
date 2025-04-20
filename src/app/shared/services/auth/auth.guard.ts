import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.tokenService.isAuthenticated()) {
      const requiredRole = route.data['role'];
      if (requiredRole && this.tokenService.getUserRole() !== requiredRole) {
        this.router.navigate(['/access-denied']); // Or any appropriate route
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
