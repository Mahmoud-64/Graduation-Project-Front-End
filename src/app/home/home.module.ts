import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { JobItemComponent } from './job-item/job-item.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.module'
import { NewJobComponent } from './new-job/new-job.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import {ScrollingModule} from '@angular/cdk/scrolling';






@NgModule({
  declarations: [JobListComponent, JobItemComponent, JobDetailsComponent, HomeComponent,NewJobComponent, SearchComponent],
  imports: [
    CommonModule, HomeRoutingModule, FormsModule, ReactiveFormsModule, ScrollingModule
  ],
  exports: [
    HomeComponent, NewJobComponent , JobDetailsComponent,SearchComponent
  ]
})
export class HomeModule { }
