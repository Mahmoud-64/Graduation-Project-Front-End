import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  passowrds = {
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  }
  constructor( private userService: UserService) { }

  ngOnInit(): void {
  }
  onSubmit(f) {
    console.log(this.passowrds);
    this.userService.resetPassword(this.passowrds).subscribe(result=>{
      console.log(result);
    });
  }

}
