import { Component, OnInit, Input, OnChanges, SimpleChange  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../service/user.service';
import { SeekerService } from '../../service/seeker.service';
import { Seeker } from '../../models/seeker';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.css']
})
export class DetailsFormComponent implements OnInit, OnChanges {
  details: FormGroup ;
  error: any;
  @Input() seeker: Seeker;

  constructor(private seekerService: SeekerService, private userService: UserService) { }

  ngOnInit(): void {
    this.details = new FormGroup({
      phone: new FormControl('',Validators.required),
      address: new FormControl(''),
      city: new FormControl(''),
      seniority: new FormControl(''),
      expYears: new FormControl(''),
      currentJob: new FormControl(''),
      currentSalary: new FormControl(''),
      expectedSalary: new FormControl(''),
      cv: new FormControl(''),
    });

  }



  ngOnChanges(changes: {[propKey: string]: SimpleChange})
  {
      let to = JSON.stringify(changes["seeker"].currentValue);
      this.details? this.details.patchValue(this.seeker) : null ;
  }

  get phone()
  {
    return this.details.get('phone');
  }

  onClickSubmit(formData)
  {
    let user_id = this.userService.user_id;
    console.log(formData);
    console.log(user_id);
    this.seekerService.updateSeeker(user_id, formData)
    .subscribe((data) => {
      console.log("dataaaa",data)
      this.error = data.message? data : null;
      console.log("errorrrrrr", this.error);

    });

  }

}
