import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PrimeNgModule } from '../primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OurServicesComponent } from './our-services/our-services.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LandingLayoutComponent } from './landing-layout/landing-layout.component';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    NavbarComponent,
    FooterComponent,
    OurServicesComponent,
    LandingLayoutComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule,
    LeafletModule
  ],
  exports:[
    AboutComponent,
    NavbarComponent,
    FooterComponent,
    OurServicesComponent,
  ]
})
export class LandingModule { }
