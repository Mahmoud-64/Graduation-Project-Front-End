import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewFormComponent } from './interview-form/interview-form.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InterviewsRoutingModule } from './interviews-routing.module';
import { SingleInterviewComponent } from './single-interview/single-interview.component';
// import { InterviewFormComponent } from '../interview/interview-form/interview-form.component';



@NgModule({
  declarations: [InterviewFormComponent,InterviewsComponent, SingleInterviewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InterviewsRoutingModule,
    
  ],
  exports:[
    InterviewFormComponent, InterviewsComponent, SingleInterviewComponent
  ]
})
export class AdminInterviewsModule { }
