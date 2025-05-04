import { Component, inject, OnInit } from '@angular/core';
import { BookingService } from '../../shared/services/booking.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from '../../core/component/validation-message/validation-message.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Booking } from '../../shared/interfaces/booking-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrl: './add-booking.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationMessageComponent],
})
export class AddBookingComponent implements OnInit {

  bookingForm!: FormGroup;
  public config = inject(DynamicDialogConfig);
  header = 'Create Booking';
  booking!: Booking;
  isEditMode = false;
  private bookingService = inject(BookingService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private ref = inject(DynamicDialogRef);

  ngOnInit(): void {
    this.initializeComponent();
    this.buildForm();
  }
  private initializeComponent(): void {
    this.header = this.config.header || this.header;
    this.booking = this.config.data?.booking;
    this.isEditMode = this.config.data?.mode === 'edit';
  }

  buildForm() {
    const user = this.authService.currentUserSignal();
    const bookingData = this.booking || {};
    this.bookingForm = this.fb.group({
      userId: [bookingData.userId ?? user?.id],
      email: [bookingData.email ?? '', [Validators.required, Validators.email]],
      phoneNumber: [bookingData.phoneNumber ?? '', Validators.required],
      eventDate: [bookingData.eventDate ?? '', Validators.required],
      location: [bookingData.location ?? '', Validators.required],
      numberOfGuests: [
        bookingData.numberOfGuests ?? 0,
        [Validators.required, Validators.min(1)],
      ],
      iceCreamPreferences: [
        bookingData.iceCreamPreferences ?? '',
        Validators.maxLength(255),
      ],
    });
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const formValue = { ...this.bookingForm.value };
    if (this.isEditMode) {
      formValue.id = this.booking.id;
    }

    const request$: Observable<unknown> = this.isEditMode
      ? this.bookingService.updateBooking(this.booking.id, formValue)
      : this.bookingService.createBooking(formValue);

    request$.subscribe(() => {
      this.ref.close(formValue);
    });
  }

  cancel(): void {
    this.bookingForm.reset();
    this.router.navigate(['/home']);
  }
}
