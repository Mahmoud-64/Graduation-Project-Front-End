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

import { ContactsComponent } from '../dashboard/contacts/contacts.component';
import { ContactItemComponent } from '../dashboard/contacts/contact-item/contact-item.component';
import { ContactFormComponent } from '../dashboard/contacts/contact-form/contact-form.component';

import { InterviewLevelsComponent } from '../dashboard/interview-levels/interview-levels.component';
import { InterviewLevelsItemComponent } from '../dashboard/interview-levels/interview-levels-item/interview-levels-item.component';
import { InterviewLevelsFormComponent } from '../dashboard/interview-levels/interview-levels-form/interview-levels-form.component';



const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'seeker', component: SeekersComponent },
      { path: 'employee', component: EmployeesComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'jobs/new', component: NewJobComponent },
      { path: 'jobs/:id', component: SingleComponent },
      { path: 'jobs/edit/:id', component: EditJobComponent },
      { path: 'applications', component: ApplicationsComponent },
      { path: 'applications/:id', component: AppDetailsComponent },
      { path: 'interviews', component: AppDetailsComponent },
      { path: 'review', component: AdminComponent },
      { path: 'requirement', component: AdminComponent },
      { path: 'level', component: AdminComponent },
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
