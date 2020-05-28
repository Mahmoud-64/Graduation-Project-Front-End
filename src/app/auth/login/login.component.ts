import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = this.fb.group({
    email: [''],
    password: ['']
  })
  userError = '';

  constructor(private userService: UserService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.login(this.user.value).subscribe(users=>{
      this.user = users;
      this.router.navigateByUrl('/');
      console.log(users);
    },
    err=>{
      this.userError = "Email or Password is Incorrect"
    });

  }
  get email() { return this.user.get('email'); }
  get password() { return this.user.get('password'); }

}
