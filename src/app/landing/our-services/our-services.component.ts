import { Component } from '@angular/core';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css'
})
export class OurServicesComponent {
  servicesTitle = 'Our Services';
  servicesImage = 'assets/images/ice-cream-cover.jpg';
  servicesDescription = 'We cater to all types of events, big or small!';
  servicesList = [
    'Fundraisers',
    'School Events',
    'Movie Rental',
    'Cocktail Parties',
    'Sporting Events',
    'Photo Shoots',
    'Corporate Parties',
    'Wedding Receptions',
    'Marketing Events',
    'Launch Parties',
    'Reunions',
    'Birthday Parties'
  ];
  topBrands = [
    'Ben&Jerry\'s',
    'HaagenDazs',
    'Breyers',
    'Dreyers_Edys',
    'blue-bunny'
  ];
}
