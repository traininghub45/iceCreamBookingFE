// core.module.ts
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BookingService } from './services/booking.service';
import { UserService } from './services/user.service';
import { TokenService } from './services/auth/token.service';

@NgModule({
  providers:[
      BookingService,
      UserService,
      TokenService,
    ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
