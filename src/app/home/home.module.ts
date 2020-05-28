import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { JobItemComponent } from './job-item/job-item.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.module'
import { NewJobComponent } from './new-job/new-job.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [JobListComponent, JobItemComponent, JobDetailsComponent, HomeComponent,NewJobComponent],
  imports: [
    CommonModule, HomeRoutingModule, FormsModule, ReactiveFormsModule,
  ],
  exports: [
    HomeComponent, NewJobComponent
  ]
})
export class HomeModule { }
