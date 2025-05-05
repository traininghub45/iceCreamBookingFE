// contact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ContactMessage } from '../../shared/interfaces/contact-message.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = `${environment.apiUrl}/contacts`;
    

  constructor(private http: HttpClient) { }

  submitContactForm(formData: ContactMessage) {
    return this.http.post(this.baseUrl, formData);
  }
  getAllMessages() {
    return this.http.get<ContactMessage[]>(this.baseUrl);
  }
  
  markAsRead(id: number) {
    return this.http.put(`${this.baseUrl}/${id}/mark-as-read`, {});
  }
}