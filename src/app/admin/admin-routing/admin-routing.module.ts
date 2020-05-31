import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../admin.component';
import { SeekersComponent } from '../dashboard/seekers/seekers.component';
import { EmployeesComponent } from '../dashboard/employees/employees.component';
import { JobsComponent } from '../dashboard/jobs/jobs.component';
import { JobDetailsComponent } from '../../home/job-details/job-details.component';
import { NewJobComponent } from '../../home/new-job/new-job.component';
import { ContactTypesComponent } from '../dashboard/contact-types/contact-types.component';
import { ContactTypesItemComponent } from '../dashboard/contact-types/contact-types-item/contact-types-item.component';
import { ContactTypesFormComponent } from '../dashboard/contact-types/contact-types-form/contact-types-form.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children:[
      { path: 'seeker', component: SeekersComponent },
      { path: 'employee', component: EmployeesComponent },
      { path: 'jobs', component: JobsComponent },   
      { path: 'jobs/new', component: NewJobComponent },
      { path: 'jobs/:id', component: JobDetailsComponent },
      { path: 'application', component: AdminComponent },
      { path: 'review', component: AdminComponent },
      { path: 'requirement', component: AdminComponent },
      { path: 'level', component: AdminComponent },
      { path: 'contacttype', component: ContactTypesComponent },
      { path: 'contacttype/new', component: ContactTypesFormComponent },
      { path: 'contacttype/:Id', component: ContactTypesItemComponent },
      { path: 'contacttype/edit/:Id', component: ContactTypesFormComponent },
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
