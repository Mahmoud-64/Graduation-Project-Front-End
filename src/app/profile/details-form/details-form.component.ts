import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { UserService } from '../../service/user.service';
import { SeekerService } from '../../service/seeker.service';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.css']
})
export class DetailsFormComponent implements OnInit {
  details: FormGroup ;

  constructor(private seekerService: SeekerService, private userService: UserService) { }

  ngOnInit(): void {
    this.details = new FormGroup({
      phone: new FormControl(''),
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

  onClickSubmit(formData)
  {
    let user_id = this.userService.user_id;
    console.log(formData);
    console.log(user_id);
    this.seekerService.updateSeeker(user_id, formData)
    .subscribe((data) => console.log(data));

  }

}
