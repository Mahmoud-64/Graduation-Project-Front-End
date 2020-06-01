import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../../service/user.service';
import { SeekerService } from '../../../../service/seeker.service';
import { Seeker } from '../../../../models/seeker';
import { ContactService } from '../../../../profile/contact/service/contact.service';


@Component({
  selector: 'app-seeker-form',
  templateUrl: './seeker-form.component.html',
  styleUrls: ['./seeker-form.component.css']
})
export class SeekerFormComponent implements OnInit {

  editRoute;
  user={
    id: '',
    name: '',
    password:'',
    contacts: []
  };
    error: any;
    cvError: any;
    user_id;
    selfile = null;
    contactTypes: [];
    details: FormGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
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

    constructor(
      private seekerService: SeekerService,
      private userService: UserService,
      private contactService: ContactService,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router) { }

  ngOnInit(): void
  {
    this.editRoute = this.router.url.includes('edit');
    if (this.editRoute)
    {
      console.log("edit=", this.router.url.includes('edit'));

        this.route.paramMap.subscribe(params => {
          this.getSeeker(params.get('id')).subscribe((data)=>{
            this.user = data.data;
            this.user.password = "";
            console.log("user", this.user, this.user.id);

            this.details ? this.details.patchValue(this.user) : null;
            this.contacts.clear();
            for (let contact in this.user.contacts) {
              this.contacts.push(this.newContact(
                this.user.contacts[contact]['id'],
                this.user.contacts[contact]['contact_types_id'],
                this.user.contacts[contact]['data']
              ));
            }
          });
        });
    }
    this.contactService.getContactTypes().subscribe(val => {
      this.contactTypes = val['data'];
    })
  }

  getSeeker(id)
  {
      return this.seekerService.getSeeker(id);
  }

  ////////////////////////// edit form ////////////////////
  onClickSubmit(formData) {
    if (this.editRoute)
    {
      this.seekerService.updateSeeker(this.user.id, this.details.value)
        .subscribe(result => {
          this.user = result.data;
          this.error = "";
        },
          err => {
            this.error = err;
          });
    }
    else
    {
      console.log("on submit", this.details.value);

      this.seekerService.createSeeker(this.details.value)
        .subscribe(result => {
          this.user = result.data;
          this.error = "";
          console.log("return====", this.user);

        },
          err => {
            this.error = err;
            console.log("return====", this.error);
          });
    }
  }
  ////////////////////////// // //////////////////////

  get contacts(): FormArray {
    return this.details.get("contacts") as FormArray
  }
  get phone() {
    return this.details.get('phone');
  }
  get name() {
    return this.details.get('name');
  }
  get email() {
    return this.details.get('email');
  }
  get password() {
    return this.details.get('password');
  }
  get password_confirmation() {
    return this.details.get('password_confirmation');
  }

    ////////////////////////// pdf //////////////////////
    onFileSelected(event) {
      if (event.target.files && event.target.files.length > 0) {
        this.selfile = event.target.files[0];
      }
      this.cvError = "";
    }

    uploadCV() {
      if (this.selfile) {
        this.seekerService.updateCv(this.selfile, this.user_id, (result) => {
          if (result.errors) {
            this.cvError = result.errors;
          }
          else {
            this.user = result["data"];
          }
        });
      }
      else {
        this.cvError = "You must choose file to upload";
      }
    }

      ////////////////////////// Contact //////////////////////
      newContact(id, contact_types_id, data): FormGroup {
        return this.fb.group({
          id: id,
          contact_types_id: contact_types_id,
          data: data,
        })
      }

      removeContact(index) {
        let contact = this.contacts.at(index)
        this.contacts.removeAt(index);
        if (contact.value.id) {
          this.contactService.deleteContact(contact.value.id).subscribe(res => {
          });
        }
      }

      addContact(){
        this.contacts.push(this.newContactEmpty());
      }


      newContactEmpty(): FormGroup {
        return this.fb.group({
          contact_types_id: '',
          data: '',
        })
     }
}
