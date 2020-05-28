import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../service/user.service';
import { SeekerService } from '../../service/seeker.service';
import { Seeker } from '../../models/seeker';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.css']
})
export class DetailsFormComponent implements OnInit, OnChanges {
  details: FormGroup;
  error: any;
  @Input() seeker: Seeker;
  @Output() formEvent = new EventEmitter<Seeker>()
  user_id;
  selfile =null;

  constructor(private seekerService: SeekerService, private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.details = new FormGroup({
      phone: new FormControl('', Validators.required),
      address: new FormControl(''),
      city: new FormControl(''),
      seniority: new FormControl(''),
      expYears: new FormControl(''),
      currentJob: new FormControl(''),
      currentSalary: new FormControl(''),
      expectedSalary: new FormControl(''),
      cv: new FormControl(null),
    });
    this.route.paramMap.subscribe(params => {
      this.user_id = +params.get('profileId');
    })

  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    let to = JSON.stringify(changes["seeker"].currentValue);
    this.details ? this.details.patchValue(this.seeker) : null;
  }

  get phone() {
    return this.details.get('phone');
  }
  onFileSelected(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.selfile = event.target.files[0];
    }
  }

  onClickSubmit(formData) {
    this.seekerService.updateCv(this.selfile, this.user_id, (result)=>{
      console.log("response", result);
    });
  }

}
