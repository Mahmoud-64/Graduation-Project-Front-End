import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from "./profile-routing/profile-routing.module";
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ProfileComponent } from './profile.component';
import { ContactItemComponent } from './contact/contact-item/contact-item.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProfileDetailsComponent, ProfileFormComponent, ProfileComponent, ContactItemComponent, ContactListComponent, ContactFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule
  ],
  exports: [
    ProfileDetailsComponent, ProfileFormComponent, ProfileComponent
  ]
})
export class ProfileModule { }
