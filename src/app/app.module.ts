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
import { Handel403Component } from './fallback/handel403/handel403.component';
import { HeaderComponent } from './header/header.component';
import { BaseComponent } from './base/base.component';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
    Handel404Component,
    Handel500Component,
    Handel403Component,
    HeaderComponent,
    BaseComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,

    HttpClientModule,
    HomeModule,
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
