import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashboardComponent } from './client/client-dashboard.component';
import { PrimeNgModule } from '../primeng/primeng.module';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { LandingModule } from '../landing/landing.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CartComponent } from './cart/cart.component';
import { cartReducer } from '../store/cart/cart.reducer';
import { CartEffects } from '../store/cart/cart.effects';

@NgModule({
  declarations: [
    UserDashboardComponent,
    DashboardLayoutComponent,
    CartComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    LandingModule,
    NavbarComponent,
    SidebarComponent,
    
    StoreModule.forFeature('cart', cartReducer),
    EffectsModule.forFeature([CartEffects])
  ],
  providers:[
    DialogService,
    ConfirmationService,
    MessageService,
    DatePipe
  ]
})
export class DashboardModule { }
