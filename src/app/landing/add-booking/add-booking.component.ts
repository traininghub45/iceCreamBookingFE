import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../shared/services/booking.service';
import {  Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from '../../core/validation-message/validation-message.component';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrl: './add-booking.component.css',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ValidationMessageComponent
  ],
})
export class AddBookingComponent implements OnInit {

  bookingForm!: FormGroup;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    const user = this.authService.currentUserSignal();
    this.bookingForm = this.fb.group({
      userId:[user?.id],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      eventDate: ['', Validators.required],
      location: ['', Validators.required],
      numberOfGuests: [0, [Validators.required, Validators.min(1)]],
      iceCreamPreferences: ['', Validators.maxLength(255)]
    });
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      this.bookingService.createBooking(this.bookingForm.value).subscribe(() => this.router.navigate(['/bookings']));
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }
  cancel(): void {
    this.bookingForm.reset();
    this.router.navigate(['/home']);
  }
}
