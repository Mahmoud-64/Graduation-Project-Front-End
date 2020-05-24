import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from "./profile-routing/profile-routing.module";
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ProfileComponent } from './profile.component';



@NgModule({
  declarations: [ProfileDetailsComponent, ProfileFormComponent, ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  exports: [
    ProfileDetailsComponent, ProfileFormComponent, ProfileComponent
  ]
})
export class ProfileModule { }
