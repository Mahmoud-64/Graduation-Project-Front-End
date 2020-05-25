import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHelperInterceptor } from './interceptor/auth-helper.interceptor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { JobApplicationModule } from './job-application/job-application.module';
import { RouterModule } from '@angular/router';
import { InterviewModule } from './interview/interview.module';
import { Handel404Component } from './fallback/handel404/handel404.component';
import { Handel500Component } from './fallback/handel500/handel500.component';


@NgModule({
  declarations: [
    AppComponent,
    Handel404Component,
    Handel500Component,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,

    HttpClientModule,
    ProfileModule,
    JobApplicationModule,
    AuthModule,
    InterviewModule,
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHelperInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
