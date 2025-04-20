import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  form: FormGroup=new FormGroup({
    name : new FormControl(''),   
    email : new FormControl(''),
    phoneNumber :new FormControl(''),
    message :new FormControl(''),
  });
  cover = 'https://img.freepik.com/free-vector/ice-cream-truck-concept-illustration_114360-1956.jpg?w=826'; // Relevant cover image
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

  

  constructor() { 
  
  }

  ngOnInit(): void {
  }

  send(){
    
  }

}
