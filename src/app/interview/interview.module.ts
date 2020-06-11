import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { InterviewItemComponent } from './interview-item/interview-item.component';
import { InterviewDetailsComponent } from './interview-details/interview-details.component';
import { InterviewFormComponent } from './interview-form/interview-form.component';
import { InterviewComponent } from './interview.component';
import { FormsModule } from '@angular/forms';
import { InterviewLevelsComponent } from './interview-levels/interview-levels.component';
import { MatStepperModule } from '@angular/material/stepper';
import { InterviewEditComponent } from './interview-edit/interview-edit.component';
import { RouterModule } from '@angular/router';
import { InterviewsRoutingModule2 } from './interviews-routing-module2';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { EmpInterviewListComponent } from './emp-interview-list/interview-list.component';
import { EmpInterviewItemComponent } from './emp-interview-item/interview-item.component';
import { EmpInterviewEditComponent } from './emp-interview-edit/interview-edit.component';


@NgModule({
  declarations: [
    InterviewListComponent,
    InterviewItemComponent,
    InterviewDetailsComponent,
    InterviewFormComponent,
    InterviewComponent,
    InterviewLevelsComponent,
    InterviewEditComponent,
    EmpInterviewListComponent,
    EmpInterviewItemComponent,
    EmpInterviewEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatStepperModule,
    InterviewsRoutingModule2,
    FlashMessagesModule.forRoot(),


  ],
  exports: [
    InterviewListComponent,
    InterviewItemComponent,
    InterviewDetailsComponent,
    InterviewFormComponent,
    InterviewLevelsComponent,
  ]
})
export class InterviewModule { }
