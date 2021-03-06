import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { Handel404Component } from './fallback/handel404/handel404.component';
import { Handel500Component } from './fallback/handel500/handel500.component';
import { Handel403Component } from './fallback/handel403/handel403.component';
import { AuthGuard } from './auth.guard';
import { UserService } from './service/user.service';
import { UserResolverService } from './resolvers/user-resolver.service';
import { Role } from './models/role.enum';
import { BaseComponent } from './base/base.component';
import { HomeJobsComponent } from './home/home-jobs/home-jobs.component';
import { EmpInterviewListComponent } from './interview/emp-interview-list/interview-list.component';
import { EmpInterviewItemComponent } from './interview/emp-interview-item/interview-item.component';
import { EmpInterviewEditComponent } from './interview/emp-interview-edit/interview-edit.component';


const routes: Routes = [

  {
    path: '',
    component: BaseComponent,
    resolve: { authUser: UserResolverService },
    children: [
      {
        path: '',
        component: HomeJobsComponent,
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'admin',
        // canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        data: {
          role: Role.superadmin,
        },
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'applications',
        loadChildren: () =>
          import('./job-application/job-application.module').then((m) => m.JobApplicationModule),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        data: {
          roleSek: Role.seeker,
          roleEmp: Role.employee,
          roleAdmin: Role.superadmin,
        },
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      { path: 'signup', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'resetpassword', component: ResetPasswordComponent },

      {
        path: 'emprev',
        canActivate: [AuthGuard],
        data: {
          roleEmp: Role.employee,
        },
        component: EmpInterviewListComponent
      },
      {
        path: 'emprev/details/:id',
        canActivate: [AuthGuard],
        data: {
          roleEmp: Role.employee,
        }, component: EmpInterviewItemComponent
      },
      { path: 'emprev/review/:id', component: EmpInterviewEditComponent },


      { path: 'error404', component: Handel404Component },
      { path: 'error500', component: Handel500Component },
      { path: 'error403', component: Handel403Component },
      {
        path: '**',
        redirectTo: 'jobs',
        pathMatch: 'full'
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    UserService
  ]
})
export class AppRoutingModule { }
