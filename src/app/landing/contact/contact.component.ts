import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessageComponent } from '../../core/validation-message/validation-message.component';
import { PrimeNgModule } from '../../primeng/primeng.module';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      ValidationMessageComponent,
      PrimeNgModule 
    ],
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });
  cover =
    'https://img.freepik.com/free-vector/ice-cream-truck-concept-illustration_114360-1956.jpg?w=826';
  title = 'Contact Sweet Treats Ice Cream Rentals';
  description = 'We would love to hear from you!';
  content = `
    For inquiries, bookings, or any other questions, feel free to reach out to us. Our team is here to assist you with all your ice cream rental needs.
  `;
  phone = '+1234567890';
  wa = '+1234567890';
  tel = 'tel:+1234567890';
  was = 'https://wa.me/1234567890';
  mail = 'info@sweettreats.com';
  email = 'mailto:info@sweettreats.com';

  constructor() {}

  ngOnInit(): void {}

  send() {}
}
