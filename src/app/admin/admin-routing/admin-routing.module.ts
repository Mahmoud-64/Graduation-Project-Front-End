import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../admin.component';
import { SeekersComponent } from '../dashboard/seekers/seekers.component';
import { EmployeesComponent } from '../dashboard/employees/employees.component';
import { JobsComponent } from '../dashboard/admin-jobs/jobs/jobs.component';
import { JobDetailsComponent } from '../../home/job-details/job-details.component';
import { NewJobComponent } from '../../home/new-job/new-job.component';
import { ApplicationsComponent } from '../dashboard/admin-apps/applications/applications.component';
import { AppDetailsComponent } from '../../job-application/app-details/app-details.component';
import { SingleComponent } from '../dashboard/admin-jobs/single/single.component';
import { EditJobComponent } from '../dashboard/admin-jobs/edit-job/edit-job.component';

import { ContactTypesComponent } from '../dashboard/contact-types/contact-types.component';
import { ContactTypesItemComponent } from '../dashboard/contact-types/contact-types-item/contact-types-item.component';
import { ContactTypesFormComponent } from '../dashboard/contact-types/contact-types-form/contact-types-form.component';
import { InterviewsComponent } from '../../admin-interviews/interviews/interviews.component';
import { SingleInterviewComponent } from 'src/app/admin-interviews/single-interview/single-interview.component';


import { ContactsComponent } from '../dashboard/contacts/contacts.component';
import { ContactItemComponent } from '../dashboard/contacts/contact-item/contact-item.component';
import { ContactFormComponent } from '../dashboard/contacts/contact-form/contact-form.component';

import { InterviewLevelsComponent } from '../dashboard/interview-levels/interview-levels.component';
import { InterviewLevelsItemComponent } from '../dashboard/interview-levels/interview-levels-item/interview-levels-item.component';
import { InterviewLevelsFormComponent } from '../dashboard/interview-levels/interview-levels-form/interview-levels-form.component';


import { ShowSeekerComponent } from '../dashboard/seekers/show-seeker/show-seeker.component';
import { SeekerFormComponent } from '../dashboard/seekers/seeker-form/seeker-form.component';
import { ShowEmployeeComponent } from '../dashboard/employees/show-employee/show-employee.component';
import { FormEmployeeComponent } from '../dashboard/employees/form-employee/form-employee.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'seeker', component: SeekersComponent },
      { path: 'seeker/show/:id', component: ShowSeekerComponent },
      { path: 'seeker/new', component: SeekerFormComponent },
      { path: 'seeker/edit/:id', component: SeekerFormComponent },
      { path: 'employee', component: EmployeesComponent },
      { path: 'employee/new', component: FormEmployeeComponent },
      { path: 'employee/show/:id', component: ShowEmployeeComponent },
      { path: 'employee/edit/:id', component: FormEmployeeComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'jobs/new', component: NewJobComponent },
      { path: 'jobs/:id', component: SingleComponent },
      { path: 'jobs/edit/:id', component: EditJobComponent },
      { path: 'applications', component: ApplicationsComponent },
      { path: 'applications/:id', component: AppDetailsComponent },
      { path: 'interviews', component: InterviewsComponent },
      { path: 'interviews/:id', component: SingleInterviewComponent },
      { path: 'review', component: AdminComponent },
      { path: 'requirement', component: AdminComponent },
      { path: 'contacttype', component: ContactTypesComponent },
      { path: 'contacttype/new', component: ContactTypesFormComponent },
      { path: 'contacttype/:Id', component: ContactTypesItemComponent },
      { path: 'contacttype/edit/:Id', component: ContactTypesFormComponent },
      { path: 'contact', component: ContactsComponent },
      { path: 'contact/new', component: ContactFormComponent },
      { path: 'contact/:Id', component: ContactItemComponent },
      { path: 'contact/edit/:Id', component: ContactFormComponent },
      { path: 'levels', component: InterviewLevelsComponent },
      { path: 'levels/new', component: InterviewLevelsFormComponent },
      { path: 'levels/:Id', component: InterviewLevelsItemComponent },
      { path: 'levels/edit/:Id', component: InterviewLevelsFormComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
