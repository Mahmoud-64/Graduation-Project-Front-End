import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewListComponent } from './interview-list/interview-list.component';
import { InterviewItemComponent } from './interview-item/interview-item.component';
import { InterviewDetailsComponent } from './interview-details/interview-details.component';
import { InterviewFormComponent } from './interview-form/interview-form.component';
import { InterviewComponent } from './interview.component';
// import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { InterviewLevelsComponent } from './interview-levels/interview-levels.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { InterviewEditComponent } from './interview-edit/interview-edit.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [InterviewListComponent, InterviewItemComponent, InterviewDetailsComponent, InterviewFormComponent, InterviewComponent, InterviewLevelsComponent, InterviewEditComponent],
  imports: [
    CommonModule,
    // AppRoutingModule,
    RouterModule,
    FormsModule,
    // BrowserAnimationsModule,
    MatStepperModule,

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
