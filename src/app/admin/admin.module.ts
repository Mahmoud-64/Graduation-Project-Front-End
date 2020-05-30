import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { SeekersComponent } from './dashboard/seekers/seekers.component';
import { EmployeesComponent } from './dashboard/employees/employees.component';
import { JobsComponent } from './dashboard/jobs/jobs.component';
import { HomeModule } from '../home/home.module';



@NgModule({
  declarations: [AdminComponent, SidebarComponent, SeekersComponent, EmployeesComponent, JobsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HomeModule
  ]
})
export class AdminModule { }
