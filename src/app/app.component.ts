import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { UserService } from './service/user.service';
import { Role } from './models/role.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Graduation-Project-Front-End';
  loggedIn = false;
  userName: String;
  profileId: String;
  constructor(public userService: UserService) { }
  ngOnInit() {
    this.loggedIn = this.userService.loggedIn();
    if (this.loggedIn) {
      this.userService.getLoggedInUser().subscribe(user => {
        this.userName = user['name'];
        this.profileId = user['id'];
      });
    }
    this.userService.subject.subscribe({
      next: (val) => {
        if (val === false) {
          setTimeout(() => {
            this.loggedIn = false;
          });
        } else {
          setTimeout(() => {
            this.loggedIn = true;
          });
          this.userService.getLoggedInUser().subscribe(user => this.userName = user['name']);
        }
      }
    });
  }

  isSuperadmin()
  {
    console.log(this.userService.hasRole());
    return this.userService.hasRole()==Role.superadmin;
  }


}
