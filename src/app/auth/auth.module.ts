import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthComponent } from './auth.component';



@NgModule({
  declarations: [RegisterComponent, LoginComponent, ResetPasswordComponent, AuthComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
