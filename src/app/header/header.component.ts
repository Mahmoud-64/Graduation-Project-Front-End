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
  constructor(
    public userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { authUser: any }) => {
      this.user = data.authUser;
      if(this.user)
      {
          this.userService.verifyEmailSubject.next(this.user['verify_email']);
          this.userName = this.user['name'];
          this.profileId = this.user['id'];
          this.isSuperadmin = this.userService.getUserRole()==Role.superadmin;
          this.loggedIn = true;
      }
    });

    this.userService.subject.subscribe({
      next: (val) =>
      {
        if (val === false)
        {
            this.loggedIn = false;
        }
        else
        {
          this.user = this.userService.getUser().data;
          this.userName = this.user['name'];
          this.profileId = this.user['id'];
          this.isSuperadmin = this.userService.getUserRole()==Role.superadmin;
          this.loggedIn = true;
        }
      }
    });
  }

}
