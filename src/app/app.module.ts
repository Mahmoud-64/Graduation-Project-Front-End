import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ProfileModule } from './profile/profile.module';
import { JobApplicationModule } from './job-application/job-application.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProfileModule,
    JobApplicationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
