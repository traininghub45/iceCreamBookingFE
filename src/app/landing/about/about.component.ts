import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  cover = 'https://img.freepik.com/free-vector/ice-cream-truck-concept-illustration_114360-1956.jpg?w=826'; // Example image related to ice cream rental
  title = 'About Our Ice Cream Rental Service';
  description = 'Bringing joy and sweetness to your events with our premium ice cream truck rental service.';
  content = `
    At Sweet Treats Ice Cream Rentals, we specialize in providing a delightful and memorable ice cream experience for all kinds of events. 
    Whether you're planning a birthday party, a corporate event, or a special occasion, our charming ice cream truck will bring joy and excitement to your guests.
    
    Our service includes a fully equipped ice cream truck with a wide selection of delicious flavors, custom packages, and professional staff to ensure a smooth and enjoyable experience. We pride ourselves on our attention to detail and commitment to making your event special.
    
    Let us help you create sweet memories with our unique ice cream rental service!
  `;
  cover1 = 'https://img.freepik.com/free-vector/ice-cream-cone-pattern_23-2148683428.jpg?w=740'; // Additional image related to ice cream

}
