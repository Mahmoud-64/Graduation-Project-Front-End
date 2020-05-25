import { Component, OnInit, Input, Output, EventEmitter , OnChanges, SimpleChange  } from '@angular/core';
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
  @Output() formEvent = new EventEmitter<Seeker>()
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
    this.userService.updateUser(user_id, formData)
    .subscribe((data) => {
      if (data.message)
      {
          this.error = data;
          console.log("errorrrrrr", this.error);
      }
      else
      {
          console.log("dataaaa",data.data);
          this.formEvent.emit(data.data)
      }

    });

  }
}
