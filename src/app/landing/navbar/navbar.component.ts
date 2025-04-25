import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  Navs: any[] = [
    { menu: 'Home', menuurl: '/' },
    { menu: 'Services', menuurl: '/services' },
    { menu: 'About us', menuurl: '/about' },
    { menu: 'Contact', menuurl: '/contact' }
  ];
  private authService = inject(AuthService)
  currentUser = this.authService.currentUserSignal;
  isLoggedIn = computed(() => !!this.currentUser());
  environment = environment.imageUrl
  logout() {
    this.authService.logout();
  }
}