import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { SeekersComponent } from './dashboard/seekers/seekers.component';
import { EmployeesComponent } from './dashboard/employees/employees.component';
import { JobsComponent } from './dashboard/jobs/jobs.component';
import { ContactTypesComponent } from './dashboard/contact-types/contact-types.component';
import { ContactTypesListComponent } from './dashboard/contact-types/contact-types-list/contact-types-list.component';
import { ContactTypesItemComponent } from './dashboard/contact-types/contact-types-item/contact-types-item.component';
import { HomeModule } from '../home/home.module';
import { ContactTypesFormComponent } from './dashboard/contact-types/contact-types-form/contact-types-form.component';



@NgModule({
  declarations: [AdminComponent, SidebarComponent, SeekersComponent, EmployeesComponent, JobsComponent, ContactTypesComponent, ContactTypesListComponent, ContactTypesItemComponent, ContactTypesFormComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
