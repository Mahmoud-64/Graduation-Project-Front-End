import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../service/user.service';
import { SeekerService } from '../../service/seeker.service';
import { Seeker } from '../../models/seeker';
import { ContactService } from '../contact/service/contact.service';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.css']
})
export class DetailsFormComponent implements OnInit, OnChanges {
  error: any;
  @Input() seeker: Seeker;
  @Output() formEvent = new EventEmitter<Seeker>()
  user_id;
  selfile = null;
  contactTypes: [];

  constructor(private seekerService: SeekerService, private userService: UserService,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

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

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.user_id = +params.get('profileId');
    });
    this.contactService.contactTypes.subscribe(val=>{
      this.contactTypes = val;
    })
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    let to = JSON.stringify(changes["seeker"].currentValue);
    this.details ? this.details.patchValue(this.seeker) : null;
    this.contacts.clear();
    for (let contact in this.seeker.contacts) {
      console.log("contact",this.seeker.contacts[contact]);
      this.contacts.push(this.newContact(
        this.seeker.contacts[contact]['id'],
        this.seeker.contacts[contact]['contact_types_id'],
        this.seeker.contacts[contact]['data']
      ));
    }
  }
  newContact(id, contact_types_id, data): FormGroup {
    return this.fb.group({
      id: id,
      contact_types_id: contact_types_id,
      data: data,
    })
  }
  get phone() {
    return this.details.get('phone');
  }

  removeContact(index){
    let contact = this.contacts.at(index)
    this.contacts.removeAt(index);
    console.log(contact.value.id);
    
    this.contactService.deleteContact(contact.value.id).subscribe(res=>{
      console.log("removed", res);
      
    });
  }
  
  onFileSelected(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.selfile = event.target.files[0];
    }
  }

  uploadCV() {
    this.seekerService.updateCv(this.selfile, this.user_id, (result) => {
      console.log("response", result);
    });
  }

  onClickSubmit(formData) {
    this.seekerService.updateSeeker(this.user_id, this.details.value)
      .subscribe(result => {
        this.seeker = result.data;
        this.formEvent.emit(this.seeker);
      },
        err => {
          console.log("error happened", err);
        });
  }
  get contacts(): FormArray {
    return this.details.get("contacts") as FormArray
  }


}
