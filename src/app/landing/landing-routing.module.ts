// landing-routing.module.ts
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
    children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuard]},
      { path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
      { path: 'contact', component: ContactComponent, canActivate: [AuthGuard]},
      { path: 'booking', component: AddBookingComponent, canActivate: [AuthGuard]},
      { path: 'services', component: OurServicesComponent, canActivate: [AuthGuard]},
      { path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
