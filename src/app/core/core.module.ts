// core.module.ts
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ValidationMessageComponent } from './validation-message/validation-message.component';

@NgModule({
  providers: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
