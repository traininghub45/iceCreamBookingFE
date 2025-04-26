import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ transform: 'translateX(100%)', opacity: 0 })
        ),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  // Hero Section
  businessName = 'Your Ice Cream Adventure';
  tagline = 'Delightful Ice Cream for Every Event';
  introduction = `
    Welcome to Your Ice Cream Adventure, where we bring the joy of ice cream directly to your doorstep with our charming ice cream truck rental service! 
    Perfect for birthdays, corporate events, and special occasions.
  `;
  heroImage = 'assets/images/StockCakeBalloonFilledParkFun1723453532.jpg';

  // Services Section
  servicesTitle = 'Our Services';
  servicesImage = 'assets/images/StockCakeIceCreamDelight1723453811.jpg';
  servicesDescription =
    'Enjoy a range of services tailored to your event needs';
  servicesContent = `
    - **Ice Cream Truck Rental**: Book our fully equipped ice cream truck for your event.
    - **Flavor Variety**: Choose from classic and gourmet ice cream flavors.
    - **Custom Packages**: Tailor your package with themed decorations and personalized service.
    - **Event Types**: Ideal for birthdays, weddings, festivals, and corporate gatherings.
  `;

  // Testimonials Section
  testimonialTitle1 = 'Happy Clients';
  testimonialImage1 = 'assets/images/StockCakeJoyfulIceCream1723454181.jpg';
  testimonialDescription1 = 'What our clients are saying';
  testimonialContent1 = `
    "Our event was a huge success, thanks to Your Ice Cream Adventure. The kids loved it, and so did the adults!" - Sarah T.
  `;

  // Promotional Offers Section
  promotionTitle = 'Current Promotions';
  promotionImage = 'assets/images/StockCakeJoyfulIceCream1723454181.jpg';
  promotionDescription = 'Check out our latest offers and discounts';
  promotionContent = `
    - **Summer Special**: Get 10% off for any weekend booking in August.
    - **Loyalty Program**: Book three events, and get the fourth at half price.
  `;

  // Booking and Offers Section
  bookingTitle = 'Book Your Ice Cream Truck';
  bookingImage = 'assets/images/StockCakeJoyfulBeachRun1723454019.jpg';
  bookingDescription = 'Secure your booking now for an unforgettable event!';
  bookingContent = `
    - **How to Book**: Reach out via phone or email to check availability.
    - **Pricing**: Base rate starts at $[price] per hour with custom packages available.
    - **Seasonal Offers**: Book for any weekend in August and get 10% off!
    - **Loyalty Program**: Book three events and get the fourth at half price.
  `;

  ngOnInit() {}
}
