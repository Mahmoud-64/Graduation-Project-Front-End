import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ProfileComponent } from './profile.component';



@NgModule({
  declarations: [ProfileDetailsComponent, ProfileFormComponent, ProfileComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ProfileDetailsComponent, ProfileFormComponent, ProfileComponent
  ]
})
export class ProfileModule { }
