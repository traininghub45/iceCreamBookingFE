import { Component, OnInit, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  listTitles: any[] =[];
  private toggleButton: HTMLElement = new HTMLElement;
  private sidebarVisible: boolean;
  private mobileMenuVisible: boolean = false;
  private routerEventsSubscription: Subscription = new Subscription; 

  constructor(
    private location: Location,
    private element: ElementRef,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0] as HTMLElement;

    // Subscribe to router events to close the sidebar on navigation
    this.routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.sidebarClose();
        this.removeCloseLayer();
      }
    });
  }

  ngOnDestroy() {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }

  sidebarOpen() {
    this.renderer.addClass(document.body, 'nav-open');
    this.renderer.addClass(this.toggleButton, 'toggled');
    this.sidebarVisible = true;
  }

  sidebarClose() {
    this.renderer.removeClass(document.body, 'nav-open');
    this.renderer.removeClass(this.toggleButton, 'toggled');
    this.sidebarVisible = false;
  }

  sidebarToggle() {
    if (this.sidebarVisible) {
      this.sidebarClose();
    } else {
      this.sidebarOpen();
    }

    if (this.mobileMenuVisible) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    const $layer = this.createCloseLayer();
    const mainPanel = document.querySelector('.main-panel') || document.querySelector('.wrapper-full-page');
    if (mainPanel) {
      this.renderer.appendChild(mainPanel, $layer);
    }

    setTimeout(() => {
      this.renderer.addClass($layer, 'visible');
    }, 100);

    this.renderer.listen($layer, 'click', () => {
      this.sidebarClose();
      this.closeMobileMenu();
    });

    this.mobileMenuVisible = true;
  }

  closeMobileMenu() {
    const $layer = document.querySelector('.close-layer');
    if ($layer) {
      this.renderer.removeClass($layer, 'visible');
      setTimeout(() => {
        $layer?.remove();
      }, 400);
    }
    this.renderer.removeClass(document.body, 'nav-open');
    this.renderer.removeClass(this.toggleButton, 'toggled');
    this.mobileMenuVisible = false;
  }

  createCloseLayer(): HTMLElement {
    const $layer = this.renderer.createElement('div');
    this.renderer.addClass($layer, 'close-layer');
    return $layer;
  }

  getTitle() {
    let title = this.location.prepareExternalUrl(this.location.path());
    if (title.charAt(0) === '#') {
      title = title.slice(1);
    }

    const matchingRoute = this.listTitles.find(item => item.path === title);
    return matchingRoute ? matchingRoute.title : 'Dashboard';
  }

  removeCloseLayer() {
    const $layer = document.querySelector('.close-layer');
    if ($layer) {
      this.renderer.removeChild(document.body, $layer);
      this.mobileMenuVisible = false;
    }
  }
}
