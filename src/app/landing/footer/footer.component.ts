import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  businessDescription = `
  We are dedicated to bringing joy and delight with our premium ice cream truck rental services. 
  Whether it’s a birthday party, corporate event, or a special gathering, our wide range of flavors and 
  personalized service make every occasion unforgettable.
`;

constructor() {}

ngOnInit() {}
}
