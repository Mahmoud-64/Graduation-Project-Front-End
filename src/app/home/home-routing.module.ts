import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { JobDetailsComponent} from './job-details/job-details.component'

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: 'new', component: JobDetailsComponent},
            { path: ':id', component: JobDetailsComponent },
        
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }
