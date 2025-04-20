import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  private _router: Subscription = new Subscription();
  private lastPoppedUrl: string = '';
  private yScrollStack: number[] = [];
  private perfectScrollbarMainPanel: PerfectScrollbar | null = null;
  private perfectScrollbarSidebar: PerfectScrollbar | null = null;

  constructor(public location: Location, private router: Router) {}

  ngOnInit(): void {
    const isWindows = navigator.platform.indexOf('Win') > -1;

    if (isWindows) {
      document.body.classList.add('perfect-scrollbar-on');
    } else {
      document.body.classList.remove('perfect-scrollbar-on');
    }

    const elemMainPanel = document.querySelector('.main-panel') as HTMLElement;
    const elemSidebar = document.querySelector('.sidebar .sidebar-wrapper') as HTMLElement;

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url!;
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = '';
          window.scrollTo(0, this.yScrollStack.pop()!);
        } else {
          window.scrollTo(0, 0);
        }
      }
    });

    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      elemMainPanel.scrollTop = 0;
      elemSidebar.scrollTop = 0;
    });

    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      this.perfectScrollbarMainPanel = new PerfectScrollbar(elemMainPanel);
      this.perfectScrollbarSidebar = new PerfectScrollbar(elemSidebar);
    }
  }

  ngAfterViewInit(): void {
    this.runOnRouteChange();
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    this._router.unsubscribe();

    // Destroy PerfectScrollbar instances to clean up
    if (this.perfectScrollbarMainPanel) {
      this.perfectScrollbarMainPanel.destroy();
    }
    if (this.perfectScrollbarSidebar) {
      this.perfectScrollbarSidebar.destroy();
    }
  }

  isMaps(path: string): boolean {
    const titlee = this.location.prepareExternalUrl(this.location.path()).slice(1);
    return path !== titlee;
  }

  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = document.querySelector('.main-panel') as HTMLElement;
      if (this.perfectScrollbarMainPanel) {
        this.perfectScrollbarMainPanel.update();
      } else {
        this.perfectScrollbarMainPanel = new PerfectScrollbar(elemMainPanel);
      }
    }
  }

  isMac(): boolean {
    return /MAC|IPAD/.test(navigator.platform.toUpperCase());
  }
}
