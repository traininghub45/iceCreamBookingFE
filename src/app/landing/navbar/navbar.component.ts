import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  Navs = [
    { menu: 'Home', menuurl: '/' },
    { menu: 'Services', menuurl: '/services' },
    { menu: 'About us', menuurl: '/about' },
    { menu: 'Contact', menuurl: '/contact' }
  ];
  private authService = inject(AuthService)
  currentUser = this.authService.currentUserSignal;
  isLoggedIn = computed(() => !!this.currentUser());
  logout() {
    this.authService.logout();
  }
}