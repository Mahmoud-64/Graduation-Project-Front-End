import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.logout().subscribe(ev=>console.log(ev));
    this.userService.loggedIn();
    this.router.navigateByUrl('/');
    console.log("logout");
    
  }

}
