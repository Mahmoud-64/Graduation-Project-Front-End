import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {
  // form: FormGroup;
  seeker: FormGroup ;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.seeker = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('')
    });
  }

  onClickSubmit(formData)
  {
    let user_id = this.userService.user_id;
    this.userService.updateUser(user_id, formData)
    .subscribe((data) => console.log(data));

  }

}
