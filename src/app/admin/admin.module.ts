import { NgModule, ApplicationModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { SeekersComponent } from './dashboard/seekers/seekers.component';
import { EmployeesComponent } from './dashboard/employees/employees.component';
import { JobsComponent } from './dashboard/jobs/jobs.component';
import { HomeModule } from '../home/home.module';
import { ApplicationsComponent } from './dashboard/applications/applications.component';
import { JobApplicationModule } from '../job-application/job-application.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AdminComponent, SidebarComponent, SeekersComponent, EmployeesComponent, JobsComponent, ApplicationsComponent],
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
