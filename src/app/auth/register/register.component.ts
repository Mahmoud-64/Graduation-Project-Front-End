import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user';
import { NgModel, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
  }
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.register(this.user).subscribe(users=>{
      this.router.navigateByUrl('/login');
      // this.user=users
    });
  }

}
