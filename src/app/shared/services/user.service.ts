// booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user-model';
import { UserLogin } from '../interfaces/user-login-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5000/api/auth/register';

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // Ensure this method returns an Observable<Booking[]>
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  login(userLogin : UserLogin): Observable<UserLogin> {  
  
    const url = "http://localhost:5000/api/auth/login";
  
    return this.http.post<UserLogin>(url,userLogin)
  }

  
  updateUser(id: number, booking: User): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, booking);
  }

 

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
