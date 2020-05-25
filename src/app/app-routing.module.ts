import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { JobItemComponent } from './home/job-item/job-item.component'
import { InterviewFormComponent } from './interview/interview-form/interview-form.component';
import { InterviewComponent } from './interview/interview.component';
import { InterviewItemComponent } from './interview/interview-item/interview-item.component';
import { InterviewListComponent } from './interview/interview-list/interview-list.component';
import { InterviewDetailsComponent } from './interview/interview-details/interview-details.component';
import { Handel404Component } from './fallback/handel404/handel404.component';
import { Handel500Component } from './fallback/handel500/handel500.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'applications',
    loadChildren: () =>
      import('./job-application/job-application.module').then((m) => m.JobApplicationModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  { path: 'signup', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },

  {
    path: 'interview', component: InterviewComponent,
    children: [
      {
        path: 'add',
        component: InterviewFormComponent
      },
      {
        path: 'show/:id',
        component: InterviewItemComponent
      },
      {
        path: 'list',
        component: InterviewListComponent
      },
      {
        path: 'details',
        component: InterviewDetailsComponent
      }
    ]
  },
  { path: 'error404', component: Handel404Component },
  { path: 'error500', component: Handel500Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
