import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { SeekersComponent } from './dashboard/seekers/seekers.component';
import { EmployeesComponent } from './dashboard/employees/employees.component';



@NgModule({
  declarations: [AdminComponent, SidebarComponent, SeekersComponent, EmployeesComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
