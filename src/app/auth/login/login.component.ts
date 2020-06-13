import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/models/role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = this.fb.group({
    email: [''],
    password: [''],
    rememberMe: ['']
  })
  userError = '';
  verify_email: Boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.verify_email = this.route.snapshot.paramMap.get('verify_email') ? true : false;
  }

  onSubmit() {
    this.userService.login(this.user.value).subscribe(users => {
      this.user = users;
      // if (this.userService.getUserRole() == Role.superadmin) {
      //   this.router.navigateByUrl('/admin');
      // }
      // else if (this.userService.getUserRole() == Role.employee) {
      //   this.router.navigateByUrl('/emprev');
      // } else {
        this.router.navigateByUrl('/');
      // }
    },
      err => {
        this.userError = "Email or Password is Incorrect"
      });

  }
  get email() { return this.user.get('email'); }
  get password() { return this.user.get('password'); }

}
