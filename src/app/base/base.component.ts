import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../service/user.service';
import { VerifyemailService } from './../service/verifyemail.service';
import { Role } from '../models/role.enum';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  title = 'Graduation-Project-Front-End';
  loggedIn = false;
  userName: String;
  user;
  profileId: String;
  isSuperadmin: Boolean;
  isEmployee: Boolean;
  isSeeker: Boolean;

  image;
  emailVerified: Boolean = false;
  loggedinUser: Boolean = false;
  emailSent: Boolean = false;
  emailSentValue: Boolean = false;
  constructor(
    public userService: UserService,
    private router: Router,
    private verifyemailService: VerifyemailService,
    private activatedRoute: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { authUser: any }) => {
      this.user = data.authUser;
      if (this.user) {
        this.userService.verifyEmailSubject.next(this.user['verify_email']);
        this.userName = this.user['name'];
        this.profileId = this.user['id'];
        this.isSuperadmin = this.userService.getUserRole() == Role.superadmin;
        this.isEmployee = this.userService.getUserRole() == Role.employee;
        this.isSeeker = this.userService.getUserRole() == Role.seeker;
        this.loggedIn = true;
      }
    });

    this.userService.subject.subscribe({
      next: (val) => {
        setTimeout(() => {
          this.loggedinUser = val;
          this.emailSentValue = this.isEmailSent();
        });
        if (val === false) {
          this.loggedIn = false;
        }
        else {
          this.user = this.userService.getUser().data;
          this.userName = this.user['name'];
          this.profileId = this.user['id'];
          this.isSuperadmin = this.userService.getUserRole() == Role.superadmin;
          this.isEmployee = this.userService.getUserRole() == Role.employee;
          this.isSeeker = this.userService.getUserRole() == Role.seeker;

          this.loggedIn = true;
        }
      }
    });

    this.image = this.router;
    this.loggedinUser = this.userService.getUser() ? true : false;

    this.userService.verifyEmailSubject.subscribe({
      next: (result) => {
        this.emailVerified = result;
      }
    });

  }

  checkPath() {
    return !(this.image.url.includes('admin')
      || this.image.url.includes('login')
      || this.image.url.includes('signup')
      || this.image.url.includes('emprev')
    );
  }

  isEmailSent() {
    if (this.loggedinUser && this.userService.getUserRole() == 3) {
      return (this.loggedinUser && !this.emailSent && !this.emailVerified);
    }
    return false;
  }

  resendEmailVerification() {
    this.verifyemailService.resendEmailVerification().subscribe(
      (data) => {
        this.emailSent = true;
      },
      (err) => {
      }
    );
  }

}
