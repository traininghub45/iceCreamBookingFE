// booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../interfaces/booking-model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) { }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/${id}`);
  }

  // Ensure this method returns an Observable<Booking[]>
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.baseUrl);
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.baseUrl, booking);
  }

  updateBooking(id: number, booking: Booking): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, booking);
  }

  // Ensure this method returns an Observable<Booking[]>
  getBookingsByUserId(userId:number): Observable<Booking[]> {
    return this.http.get<Booking[]>(
      `${this.baseUrl}/getByUserId?userId=${encodeURIComponent(userId)}&pageSize=${5}&pageNumber=${1}`
    );  }
 

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
