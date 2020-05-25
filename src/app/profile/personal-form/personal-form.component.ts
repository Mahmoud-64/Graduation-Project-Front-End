import { Component, OnInit, Input, OnChanges, SimpleChange  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { UserService } from '../../service/user.service';
import { Seeker } from '../../models/seeker';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})
export class PersonalFormComponent implements OnInit, OnChanges {
  error: any;
  @Input() seekerData: Seeker;
  seeker: FormGroup ;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.seeker = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('')
    });
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange})
  {
      this.seeker? this.seeker.patchValue(this.seekerData) : null ;
  }

  onClickSubmit(formData)
  {
    let user_id = this.userService.user_id;
    console.log(formData);
    console.log(user_id);
    this.userService.updateUser(user_id, formData)
    .subscribe((data) => {
      console.log("dataaaa",data)
      this.error = data.message? data : null;
      console.log("errorrrrrr", this.error);

    });

  }
}
