import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingService } from './services/booking.service';
import { UserService } from './services/user.service';
import { TokenService } from './services/auth/token.service';

@NgModule({
  imports: [CommonModule],
  providers:[
    BookingService,
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
