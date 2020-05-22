import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Graduation-Project-Front-End';
  loggedIn = false;
  userName: String;
  constructor(public userService: UserService){}
  ngOnInit() {
    this.loggedIn = this.userService.loggedIn();
    if(this.loggedIn){
      this.userService.getLoggedInUser().subscribe(user=>this.userName = user['name']);
    }
  }
}
