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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';
import { PersonalFormComponent } from './personal-form/personal-form.component';
import { DetailsFormComponent } from './details-form/details-form.component';
import { MobileModalComponent } from './mobile-modal/mobile-modal.component';


@NgModule({
  declarations: [ProfileDetailsComponent, ProfileFormComponent, ProfileComponent, PersonalFormComponent, DetailsFormComponent, ContactItemComponent, ContactListComponent, ContactFormComponent, MobileModalComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProfileDetailsComponent, ProfileFormComponent, ProfileComponent
  ]
})
export class ProfileModule { }
