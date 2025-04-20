import { Component } from '@angular/core';
import { Booking } from '../../shared/interfaces/booking-model';
import { BookingService } from '../../shared/services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrl: './add-booking.component.css'
})
export class AddBookingComponent {
  booking: Booking = {
    eventDate: '',
    phoneNumber:'',
    email:'',
    numberOfGuests: 0,
    isApproved: false,
    location: '',
    iceCreamPreferences: ''
  };
  isEdit: boolean = false;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.bookingService.getBooking(Number(id)).subscribe(data => this.booking = data);
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.bookingService.updateBooking(this.booking.id!, this.booking).subscribe(() => this.router.navigate(['/bookings']));
    } else {
      this.bookingService.createBooking(this.booking).subscribe(() => this.router.navigate(['/bookings']));
    }
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }
}
