import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { HomeJobsComponent } from './home-jobs/home-jobs.component';
import { JobModalComponent } from './job-modal/job-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';






@NgModule({
  declarations: [ HomeComponent, SearchComponent, HomeJobsComponent, JobModalComponent],
  imports: [
    CommonModule, HomeRoutingModule, FormsModule, ReactiveFormsModule, ScrollingModule, NgbModule
  ],
  exports: [
    HomeComponent, SearchComponent, HomeJobsComponent
  ]
})
export class HomeModule { }
