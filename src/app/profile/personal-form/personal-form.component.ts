import { Component, OnInit, Input, Output, EventEmitter , OnChanges, SimpleChange  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  user_id;
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.seeker = new FormGroup({
      name: new FormControl(''),
      // email: new FormControl('')
    });
    this.route.paramMap.subscribe(params => {
      this.user_id = +params.get('profileId');
    });
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange})
  {
      this.seeker? this.seeker.patchValue(this.seekerData.user) : null ;
  }

  onClickSubmit(formData)
  {
    this.userService.updateUser(this.user_id, formData)
    .subscribe((data) => {
        this.formEvent.emit(data)
    },
    err=>{
        this.error = err;
        console.log("error=", this.error);
    });


  }
}
