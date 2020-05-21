import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobItemComponent } from './home/job-item/job-item.component'

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'test', component: JobItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
