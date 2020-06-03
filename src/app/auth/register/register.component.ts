import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from '../../shared/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required,
    Validators.email]],
    password: ['', [Validators.required,
    Validators.minLength(7)]],
    password_confirmation: ['', Validators.required],
    phone: ['', Validators.required],
  }, {validators: PasswordValidator})
  userError = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
  }
  constructor(private userService: UserService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.register(this.user.value).subscribe(users => {
      this.router.navigate(['/login', {verify_email: users['verify_email']?true:false}]);
    },
    err=>{
      let errorData = err.errors
      this.userError = errorData;
    });
  }
  get name() { return this.user.get('name'); }
  get email() { return this.user.get('email'); }
  get password() { return this.user.get('password'); }
  get password_confirmation() { return this.user.get('password_confirmation'); }
  get phone() { return this.user.get('phone'); }

}
