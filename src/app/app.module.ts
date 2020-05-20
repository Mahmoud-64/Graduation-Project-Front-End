import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ProfileModule } from './profile/profile.module';
import { JobApplicationModule } from './job-application/job-application.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { InterviewModule } from './interview/interview.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ProfileModule,
    JobApplicationModule,
    AuthModule,
    HomeModule,
    InterviewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
