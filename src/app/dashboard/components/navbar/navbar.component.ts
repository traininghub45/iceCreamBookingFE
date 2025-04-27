import { Component, inject} from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './navbar.component.html',
  standalone:true,
  imports:[RouterModule],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  private authService = inject(AuthService)
  environment = environment.imageUrl
  currentUser = this.authService.currentUserSignal;
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  logout() {
    this.authService.logout();
  }
}
