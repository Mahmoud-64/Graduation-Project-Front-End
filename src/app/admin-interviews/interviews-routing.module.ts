import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterviewsComponent } from './interviews/interviews.component';
import { InterviewFormComponent } from './interview-form/interview-form.component';
import { SingleInterviewComponent } from './single-interview/single-interview.component';


const routes: Routes = [
  {
    path: '',
    component: InterviewsComponent,
    children: [
      { path: 'new', component: InterviewFormComponent },
      { path: ':id', component: SingleInterviewComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewsRoutingModule { }
