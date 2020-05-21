import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { JobItemComponent } from './job-item/job-item.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.module'


@NgModule({
  declarations: [JobListComponent, JobItemComponent, JobDetailsComponent, HomeComponent],
  imports: [
    CommonModule, HomeRoutingModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
