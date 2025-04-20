// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingService } from './services/booking.service';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user.service';
import { TokenService } from './services/auth/token.service';
import { AuthGuard } from './services/auth/auth.guard';

@NgModule({
  imports: [CommonModule],
  providers:[
    BookingService,
    AuthService,
    UserService,
    TokenService,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
