import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobApplicationComponent } from './job-application.component';
import { AppDetailsComponent} from './app-details/app-details.component'
import { InterviewLevelsComponent } from '../interview/interview-levels/interview-levels.component';

const routes: Routes = [
    {
        path: '',
        component: JobApplicationComponent,
        children: [
            { path: ':id/interviews', component: InterviewLevelsComponent },
            { path: ':id', component: AppDetailsComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class JobApplicationRoutingModule { }