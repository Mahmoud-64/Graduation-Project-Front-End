import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { UserService } from './service/user.service';
import { Role } from './models/role.enum';
import { tap, map, catchError } from 'rxjs/operators';

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
  isSuperadmin: Boolean;
  constructor(public userService: UserService) { }
  ngOnInit() {
    this.loggedIn = this.userService.loggedIn();
    if (this.loggedIn) {
      this.userService.getLoggedInUser().subscribe(user => {
        this.userName = user['name'];
        this.profileId = user['id'];
        this.isSuperadmin = this.userService.getUserRole()==Role.superadmin;
        console.log("is superadmin", this.isSuperadmin);
        this.loggedIn = this.userService.loggedIn();
      });
    }
    this.userService.subject.subscribe({
      next: (val) => {
        if (val === false) {
          setTimeout(() => {
            this.loggedIn = false;
          });
        } else {
          this.userService.getLoggedInUser().subscribe(user => {
            this.userName = user['name'];
            this.profileId = user['id'];
            this.isSuperadmin = this.userService.getUserRole()==Role.superadmin;
            console.log("is superadmin", this.isSuperadmin);
            this.loggedIn = this.userService.loggedIn();
          });
        }
      }
    });
  }



}
