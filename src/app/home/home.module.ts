import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { JobItemComponent } from './job-item/job-item.component';
import { JobDetailsComponent } from './job-details/job-details.component';



@NgModule({
  declarations: [JobListComponent, JobItemComponent, JobDetailsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    JobListComponent,
    JobItemComponent,
    JobDetailsComponent
  ]
})
export class HomeModule { }
