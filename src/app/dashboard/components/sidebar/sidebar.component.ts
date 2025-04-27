import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() clientBusinessName = 'Ice Cream Delight';
  @Input() userAvatar = 'assets/default-avatar.png';
  @Input() userName = 'Client User';
  @Input() pendingOrders = 0;
  
  // Navigation permissions
  @Input() showDashboard = true;
  @Input() showFlavors = true;
  @Input() showOrders = true;
  @Input() showReports = false;
  @Input() showAccount = true;
  
  @Output() logout= new EventEmitter();
  @Output() toggleSidebar = new EventEmitter();
  
  isCollapsed = false;

  constructor(private router: Router) {}

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.toggleSidebar.emit(this.isCollapsed);
  }

  onLogout(): void {
    this.logout.emit();
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
}