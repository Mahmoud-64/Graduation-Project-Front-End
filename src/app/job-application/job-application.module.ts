import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLevelModule } from './app-level/app-level.module';
import { AppListComponent } from './app-list/app-list.component';
import { AppItemComponent } from './app-item/app-item.component';
import { AppDetailsComponent } from './app-details/app-details.component';
import { JobApplicationComponent } from './job-application.component';
import { JobApplicationRoutingModule } from "./job-application-routing.module";
import {ScrollingModule} from '@angular/cdk/scrolling';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppListComponent, AppItemComponent, AppDetailsComponent, JobApplicationComponent],
  imports: [
    CommonModule,
    JobApplicationRoutingModule,
    ScrollingModule,
    NgbModule,
  ],
  exports: [ JobApplicationComponent],
})
export class JobApplicationModule { }
