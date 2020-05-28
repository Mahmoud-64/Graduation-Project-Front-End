import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
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

  error: any;
  cvError: any;
  @Input() seeker: Seeker;
  @Output() formEvent = new EventEmitter<Seeker>()
  user_id;
  selfile =null;
    details: FormGroup = this.fb.group({
      phone: ['', Validators.required],
      address: [''],
      city: [''],
      seniority: [''],
      expYears: [''],
      currentJob: [''],
      currentSalary: [''],
      expectedSalary: [''],
      cv: [''],
      contacts: this.fb.array([]),
    });

  constructor(private seekerService: SeekerService, private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
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
    let file = event.target.files;
    if(file && file.length > 0) {
      this.selfile = file[0];
    }
    this.cvError = "";
  }

  uploadCV() {
    if(this.selfile){
      this.seekerService.updateCv(this.selfile, this.user_id, (result)=>{
        if (result.errors) {
          this.cvError = result.errors;
        }
        else{
          this.seeker = result["data"];
          this.formEvent.emit(this.seeker);
        }
      });
    }
    else {
      this.cvError = "You must choose file to upload";
    }
  }

  onClickSubmit(formData) {
    this.seekerService.updateSeeker(this.user_id, this.details.value)
    .subscribe(result=>{
      this.seeker = result.data;
      this.error = "";
      this.formEvent.emit(this.seeker);
    },
    err=>{
      this.error = err;
    });
  }

  addContact(){
    this.contacts.push(this.newContact());
  }

  newContact(): FormGroup {
    return this.fb.group({
      contact_types_id: '',
      data: '',
    })
 }

  get contacts(): FormArray{
    return this.details.get('contacts') as FormArray
  }

}
