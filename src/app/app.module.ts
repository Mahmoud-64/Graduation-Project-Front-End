import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHelperInterceptor } from './interceptor/auth-helper.interceptor';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { JobApplicationModule } from './job-application/job-application.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    HttpClientModule,
    ProfileModule,
    JobApplicationModule,
    AuthModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHelperInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
