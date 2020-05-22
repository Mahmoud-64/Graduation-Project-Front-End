import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../models/user';
import { NgModel, NgForm } from '@angular/forms';

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
    contact: '',
  }
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // this.userService.login().subscribe(users=>this.user=JSON.parse(users));
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
  }

}
