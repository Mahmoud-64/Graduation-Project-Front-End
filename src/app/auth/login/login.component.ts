import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user';
import { NgModel, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    email: '',
    password: ''
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.userService.login(this.user).subscribe(users=>this.user=users);
    console.log(f.value);

  }

}
