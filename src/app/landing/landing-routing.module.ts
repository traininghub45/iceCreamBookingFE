import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { LandingLayoutComponent } from './landing-layout/landing-layout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from '../shared/services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'booking', component: AddBookingComponent },
      { path: 'services', component: OurServicesComponent },
      { path: 'user-profile', component: UserProfileComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
