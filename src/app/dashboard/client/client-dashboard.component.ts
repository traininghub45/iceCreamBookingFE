import { Component, inject, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Booking } from '../../shared/interfaces/booking-model';
import { AddBookingComponent } from '../../landing/add-booking/add-booking.component';
import { TablePageEvent } from 'primeng/table';
import { BookingService } from '../../core/services/booking.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  private bookingService = inject(BookingService);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  ref: DynamicDialogRef | undefined;
  bookings: Booking[] = [];
  totalRecords = 0;

  get upcomingOrders() {
    return this.bookings.filter(
      (x) => new Date(x.eventDate) > new Date()
    );
  }

  get recentActivity(){
    return this.bookings.slice(-3);
  }
  // Stats for the dashboard cards
  stats = {
    totalOrders: 12,
    favoriteFlavors: 3,
    pendingOrders: 1,
    totalSpent: 56.75,
  };
  ngOnInit(): void {
    this.getBookings();
  }
  trackByFn(index: number, item:Booking) {
    return item.id;
  }
  getBookings(event?:TablePageEvent){
    console.log(event)
    const skip = event?.first ?? 0;
    const take = event?.rows ?? 5;
    this.bookingService.getBookingsByUserId(this.authService.currentUserSignal()?.id as number,skip,take).subscribe((res) => {
      this.bookings = res.data;
      this.totalRecords = res.totalCount;
      this.stats = {
        totalOrders: this.bookings.length,
        pendingOrders: this.bookings.filter((x) => !x.isApproved).length,
        favoriteFlavors: 2,
        totalSpent: 55,
      };
    });
  }
  addNewBooking() {
    this.ref = this.dialogService.open(AddBookingComponent, {
      header: 'Add New Booking',
      width: '50%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        mode: 'add',
      },
    });

    this.ref.onClose.subscribe((booking: Booking) => {
      if (booking) {
        this.bookings = [...this.bookings, booking];
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Booking Added',
          life: 3000,
        });
      }
    });
  }

  editBooking(booking: Booking) {
    this.ref = this.dialogService.open(AddBookingComponent, {
      header: 'Edit Booking',
      width: '50%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        mode: 'edit',
        booking: { ...booking },
      },
    });

    this.ref.onClose.subscribe((editedBooking: Booking) => {
      if (editedBooking) {
        this.bookings = this.bookings.map((u) =>
          u.id === editedBooking.id ? editedBooking : u
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Booking Updated',
          life: 3000,
        });
      }
    });
  }
  deleteBooking(booking: Booking) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + booking.id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bookingService.deleteBooking(booking.id).subscribe(()=>{
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Booking Deleted',
            life: 3000,
          });
          this.getBookings();
        });
 
      },
    });
  }
}
