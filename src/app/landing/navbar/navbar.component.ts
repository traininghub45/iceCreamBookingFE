import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
}
