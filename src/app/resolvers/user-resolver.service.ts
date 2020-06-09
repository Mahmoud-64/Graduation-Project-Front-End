import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { UserService } from './../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<any>  {

  constructor(public userService: UserService) { }

    resolve() {
      if(!this.userService.loggedIn()){
        return false;
      }

      return this.userService.getUser() ? this.userService.getUser() : this.userService.getLoggedInUser();
    }
}
