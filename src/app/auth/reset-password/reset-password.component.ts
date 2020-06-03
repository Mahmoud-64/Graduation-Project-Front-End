import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormBuilder } from '@angular/forms';
import { PasswordValidator } from '../../shared/password.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  error;
  passwords = this.fb.group({
    current_password: '',
    password: '',
    password_confirmation: '',
  }, {validators: PasswordValidator})
  constructor(private userService: UserService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.userService.resetPassword(this.passwords.value).subscribe(result=>{
    },
    err=>{
      this.error = err.errors;
    });
  }

}
