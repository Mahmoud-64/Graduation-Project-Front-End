import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { InterviewItemComponent } from './interview-item/interview-item.component';
import { InterviewDetailsComponent } from './interview-details/interview-details.component';
import { InterviewFormComponent } from './interview-form/interview-form.component';
import { InterviewComponent } from './interview.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { InterviewLevelsComponent } from './interview-levels/interview-levels.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  declarations: [InterviewListComponent, InterviewItemComponent, InterviewDetailsComponent, InterviewFormComponent, InterviewComponent, InterviewLevelsComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatStepperModule,

  ],
  exports: [
    InterviewListComponent,
    InterviewItemComponent,
    InterviewDetailsComponent,
    InterviewFormComponent
  ]
})
export class InterviewModule { }
