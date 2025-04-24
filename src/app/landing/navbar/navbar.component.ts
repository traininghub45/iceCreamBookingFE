import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';

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

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('access_token');
  }

  logout() {
    this.isLoggedIn = false;
    this.authService.logout();
  }
}
