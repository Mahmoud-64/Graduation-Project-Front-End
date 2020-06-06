import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { Role } from '../models/role.enum';
import { tap, map, catchError } from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";
import { UserService } from './../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Graduation-Project-Front-End';
  loggedIn = false;
  userName: String;
  user;
  profileId: String;
  isSuperadmin: Boolean;
<<<<<<< HEAD
  isEmployee: Boolean;
=======
  isSeeker: Boolean;
>>>>>>> 461f30fd6400a54f5f8c8c99e2684aac8a4c3bb8
  constructor(
    public userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { authUser: any }) => {
      this.user = data.authUser;
      if (this.user) {
        this.userService.verifyEmailSubject.next(this.user['verify_email']);
        this.userName = this.user['name'];
        this.profileId = this.user['id'];
        this.isSuperadmin = this.userService.getUserRole() == Role.superadmin;
<<<<<<< HEAD
        this.isEmployee = this.userService.getUserRole() == Role.employee;
=======
        this.isSeeker = this.userService.getUserRole() == Role.seeker;
>>>>>>> 461f30fd6400a54f5f8c8c99e2684aac8a4c3bb8
        this.loggedIn = true;
      }
    });

    this.userService.subject.subscribe({
      next: (val) => {
        if (val === false) {
          this.loggedIn = false;
        }
        else {
          this.user = this.userService.getUser().data;
          this.userName = this.user['name'];
          this.profileId = this.user['id'];
          this.isSuperadmin = this.userService.getUserRole() == Role.superadmin;
<<<<<<< HEAD
          this.isEmployee = this.userService.getUserRole() == Role.employee;

=======
>>>>>>> 461f30fd6400a54f5f8c8c99e2684aac8a4c3bb8
          this.loggedIn = true;
        }
      }
    });
  }

}
