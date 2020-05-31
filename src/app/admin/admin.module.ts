import { NgModule, ApplicationModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { SeekersComponent } from './dashboard/seekers/seekers.component';
import { EmployeesComponent } from './dashboard/employees/employees.component';
import { JobsComponent } from './dashboard/admin-jobs/jobs/jobs.component';
import { HomeModule } from '../home/home.module';
import { ApplicationsComponent } from './dashboard/admin-apps/applications/applications.component';
import { JobApplicationModule } from '../job-application/job-application.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchComponent } from './dashboard/admin-apps/search/search.component';
import { SingleComponent } from './dashboard/admin-jobs/single/single.component';
import { EditJobComponent } from './dashboard/admin-jobs/edit-job/edit-job.component';



@NgModule({
  declarations: [AdminComponent, SidebarComponent, SeekersComponent, EmployeesComponent, JobsComponent, ApplicationsComponent, SearchComponent, SingleComponent, EditJobComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HomeModule,
    JobApplicationModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class AdminModule { }
