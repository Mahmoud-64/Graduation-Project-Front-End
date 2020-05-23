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
    phone: '',
  }
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.userService.register(this.user).subscribe(users=>this.user=users);
    console.log(f.value);
  }

}
