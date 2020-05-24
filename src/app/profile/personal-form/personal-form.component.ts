import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})
export class PersonalFormComponent implements OnInit {
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
    console.log(formData);
    console.log(user_id);
    this.userService.updateUser(user_id, formData)
    .subscribe((data) => console.log(data));

  }
}
