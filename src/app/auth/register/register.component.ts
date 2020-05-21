import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.login().subscribe(users=>this.users=users);
  }



}
