
import { NgModule, ApplicationModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SearchComponent } from './dashboard/admin-apps/search/search.component';
import { SingleComponent } from './dashboard/admin-jobs/single/single.component';
import { EditJobComponent } from './dashboard/admin-jobs/edit-job/edit-job.component';

import { ContactTypesComponent } from './dashboard/contact-types/contact-types.component';
import { ContactTypesListComponent } from './dashboard/contact-types/contact-types-list/contact-types-list.component';
import { ContactTypesItemComponent } from './dashboard/contact-types/contact-types-item/contact-types-item.component';
import { ContactTypesFormComponent } from './dashboard/contact-types/contact-types-form/contact-types-form.component';
// import { AdminInterviewsModule } from '../admin-interviews/admin-interviews.module';


@NgModule({
  declarations: [AdminComponent, SidebarComponent, SeekersComponent, EmployeesComponent, JobsComponent, ApplicationsComponent, SearchComponent, SingleComponent, EditJobComponent, ContactTypesComponent, ContactTypesListComponent, ContactTypesItemComponent, ContactTypesFormComponent],

  imports: [
    CommonModule,
    AdminRoutingModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    JobApplicationModule,
    // AdminInterviewsModule

  ]
})
export class AdminModule { }
