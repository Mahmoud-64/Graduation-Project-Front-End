import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { InterviewItemComponent } from './interview-item/interview-item.component';
import { InterviewDetailsComponent } from './interview-details/interview-details.component';
import { InterviewFormComponent } from './interview-form/interview-form.component';



@NgModule({
  declarations: [InterviewListComponent, InterviewItemComponent, InterviewDetailsComponent, InterviewFormComponent],
  imports: [
    CommonModule
  ],
  exports: [
    InterviewListComponent,
    InterviewItemComponent,
    InterviewDetailsComponent,
    InterviewFormComponent
  ]
})
export class InterviewModule { }
