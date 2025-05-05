// contact.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeNgModule } from '../../primeng/primeng.module';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ValidationMessageComponent } from '../../shared/components/validation-message/validation-message.component';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ValidationMessageComponent,
    PrimeNgModule,
  ],
  providers: [MessageService]
})
export class ContactComponent {
  feedbackForm: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  // UI Content
  cover = 'https://img.freepik.com/free-vector/ice-cream-truck-concept-illustration_114360-1956.jpg?w=826';
  title = 'Contact Sweet Treats Ice Cream Rentals';
  description = 'We would love to hear from you!';
  content = `For inquiries, bookings, or any other questions, feel free to reach out to us.`;
  contactInfo = {
    phone: '+1234567890',
    email: 'info@sweettreats.com',
    address: '123 Ice Cream Street, Dessert City'
  };

  isSubmitting = false;

  constructor(
    private contactService: ContactService,
    private messageService: MessageService,
    private router: Router
  ) {}

  async send() {
    if (this.feedbackForm.valid) {
      this.isSubmitting = true;
      try {
        await this.contactService.submitContactForm(this.feedbackForm.value).toPromise();
        setTimeout(() => this.router.navigate(['/']), 2000);
      } catch (error) {
        console.log(error);
      } finally {
        this.isSubmitting = false;
        this.feedbackForm.reset()
      }
    } else {
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched() {
    Object.values(this.feedbackForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  getContactMessages() {
    this.contactService.getAllMessages().subscribe({
      next: (messages) => {
        // Handle received messages
        console.log('Messages:', messages);
      },
      error: (err) => {
        console.error('Error fetching messages:', err);
      }
    });
  }
  
  markMessageAsRead(id: number) {
    this.contactService.markAsRead(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Message marked as read'
        });
      },
      error: (err) => {
        console.error('Error marking message as read:', err);
      }
    });
  }
}