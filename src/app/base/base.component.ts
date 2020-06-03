import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../service/user.service';
import { VerifyemailService } from './../service/verifyemail.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  image;
  emailVerified: Boolean = false;
  loggedinUser: Boolean = false;
  emailSent: Boolean = false;
  constructor(
  public userService: UserService,
  private router: Router,
  private verifyemailService: VerifyemailService
  ) {
   }
  ngOnInit(): void {
    this.image = this.router;
    this.loggedinUser = this.userService.getUser()? true : false;
    this.userService.verifyEmailSubject.subscribe({
      next: (result)=>{
      this.emailVerified = result;
    }
    });

    this.userService.subject.subscribe({
      next: (val) =>
      {
        setTimeout(() => {
          this.loggedinUser = val;
        });
      }
    });
  }

  checkPath()
  {
    return !(this.image.url.includes('admin')
          ||this.image.url.includes('login')
          ||this.image.url.includes('signup')
        );
  }

  isEmailSent()
  {
    return (this.loggedinUser && !this.emailSent && !this.emailVerified);
  }

  resendEmailVerification()
  {
    this.verifyemailService.resendEmailVerification().subscribe(
      (data)=>{
        this.emailSent = true;
        console.log("resend email success", data);
      },
      (err)=>{
        console.log("resend email error", err);
      }
    );
  }

}
