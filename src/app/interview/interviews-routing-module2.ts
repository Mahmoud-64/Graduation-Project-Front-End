import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterviewFormComponent } from './interview-form/interview-form.component';
import { InterviewItemComponent } from './interview-item/interview-item.component';
import { InterviewComponent } from './interview.component';
import { InterviewListComponent } from './interview-list/interview-list.component';


const routes: Routes = [
    {
        path: '',
        component: InterviewComponent,
        children: [
            { path: 'new', component: InterviewFormComponent },
            { path: 'list', component: InterviewListComponent },
            { path: ':id', component: InterviewItemComponent },

        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InterviewsRoutingModule2 { }
