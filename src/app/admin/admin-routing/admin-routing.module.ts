import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../admin.component';
import { SeekersComponent } from '../dashboard/seekers/seekers.component';
import { EmployeesComponent } from '../dashboard/employees/employees.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children:[
      { path: 'seeker', component: SeekersComponent },
      { path: 'employee', component: EmployeesComponent },
      { path: 'job', component: AdminComponent },
      { path: 'application', component: AdminComponent },
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
