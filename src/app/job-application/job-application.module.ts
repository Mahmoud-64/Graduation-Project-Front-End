import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppListComponent } from './app-list/app-list.component';
import { AppItemComponent } from './app-item/app-item.component';
import { AppDetailsComponent } from './app-details/app-details.component';
import { JobApplicationComponent } from './job-application.component';
import { JobApplicationRoutingModule } from "./job-application-routing.module";
import {ScrollingModule} from '@angular/cdk/scrolling';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminInterviewsModule } from '../admin-interviews/admin-interviews.module';
import { InterviewModule } from '../interview/interview.module';

@NgModule({
  declarations: [AppListComponent, AppItemComponent, AppDetailsComponent, JobApplicationComponent],
  imports: [
    CommonModule,
    JobApplicationRoutingModule,
    ScrollingModule,
    NgbModule,
    AdminInterviewsModule,
    InterviewModule
    
  ],
  exports: [ 
    JobApplicationComponent,
    AppDetailsComponent
],
})
export class JobApplicationModule { }
