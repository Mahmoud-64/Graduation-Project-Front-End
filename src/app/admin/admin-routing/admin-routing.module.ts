import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../admin.component';
import { SeekersComponent } from '../dashboard/seekers/seekers.component';
import { EmployeesComponent } from '../dashboard/employees/employees.component';
import { JobsComponent } from '../dashboard/jobs/jobs.component';
import { JobDetailsComponent } from 'src/app/home/job-details/job-details.component';
import { NewJobComponent } from 'src/app/home/new-job/new-job.component';
import { ApplicationsComponent } from '../dashboard/applications/applications.component';
import { AppDetailsComponent } from 'src/app/job-application/app-details/app-details.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'seeker', component: SeekersComponent },
      { path: 'employee', component: EmployeesComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'jobs/new', component: NewJobComponent },
      { path: 'jobs/:id', component: JobDetailsComponent },
      { path: 'applications', component: ApplicationsComponent },
      { path: 'applications/:id', component: AppDetailsComponent },
      { path: 'review', component: AdminComponent },
      { path: 'requirement', component: AdminComponent },
      { path: 'level', component: AdminComponent },
      { path: 'contacttype', component: AdminComponent },
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
