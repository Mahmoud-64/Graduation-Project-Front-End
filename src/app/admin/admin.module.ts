
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
import { ContactTypesFormComponent } from './dashboard/contact-types/contact-types-form/contact-types-form.component';
// import { AdminInterviewsModule } from '../admin-interviews/admin-interviews.module';

import { ContactsComponent } from './dashboard/contacts/contacts.component';
import { ContactFormComponent } from './dashboard/contacts/contact-form/contact-form.component';
import { InterviewLevelsComponent } from './dashboard/interview-levels/interview-levels.component';
import { InterviewLevelsFormComponent } from './dashboard/interview-levels/interview-levels-form/interview-levels-form.component';

import { ShowSeekerComponent } from './dashboard/seekers/show-seeker/show-seeker.component';
import { SeekerFormComponent } from './dashboard/seekers/seeker-form/seeker-form.component';
import { ShowEmployeeComponent } from './dashboard/employees/show-employee/show-employee.component';
import { FormEmployeeComponent } from './dashboard/employees/form-employee/form-employee.component';
import { StatusComponent } from './dashboard/admin-apps/status/status.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StatusFormComponent } from './dashboard/admin-apps/status/status-form/status-form.component' ;



@NgModule({
  declarations: [
    AdminComponent, SidebarComponent,
    SeekersComponent, EmployeesComponent,
    JobsComponent, ApplicationsComponent, SearchComponent, SingleComponent, EditJobComponent,
    ContactTypesComponent, ContactTypesListComponent, ContactTypesFormComponent,
    ContactsComponent, ContactFormComponent,
    InterviewLevelsComponent, InterviewLevelsFormComponent,
    ShowSeekerComponent, SeekerFormComponent, ShowEmployeeComponent, FormEmployeeComponent, StatusComponent, StatusFormComponent
  ],

  imports: [
    CommonModule,
    NgbModule,
    AdminRoutingModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    JobApplicationModule,
    // AdminInterviewsModule

  ]
})
export class AdminModule { }
