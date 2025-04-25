// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { PrimeNgModule } from './primeng/primeng.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpInterceptorService } from '../http-interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';

export function tokenGetter() {
  // Provide a function to retrieve the token from storage
  return localStorage.getItem(environment.jwtTokenKey); // Replace with your actual token key
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    MaterialModule,
    PrimeNgModule,
    FontAwesomeModule,
    SharedModule ,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),  
  ],
  providers: [
    provideHttpClient(
      withInterceptors([HttpInterceptorService]),
    ),
    provideAnimationsAsync(),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
