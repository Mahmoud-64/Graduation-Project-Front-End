import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { InterviewItemComponent } from './interview-item/interview-item.component';
import { InterviewDetailsComponent } from './interview-details/interview-details.component';
import { InterviewFormComponent } from './interview-form/interview-form.component';
import { InterviewComponent } from './interview.component';



@NgModule({
  declarations: [InterviewListComponent, InterviewItemComponent, InterviewDetailsComponent, InterviewFormComponent, InterviewComponent],
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
