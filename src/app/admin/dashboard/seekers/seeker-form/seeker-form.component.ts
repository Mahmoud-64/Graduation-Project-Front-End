import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../../service/user.service';
import { SeekerService } from '../../../../service/seeker.service';
import { Seeker } from '../../../../models/seeker';
import { ContactService } from '../../../../profile/contact/service/contact.service';
import { PasswordValidator } from '../../../../shared/password.validator';


@Component({
  selector: 'app-seeker-form',
  templateUrl: './seeker-form.component.html',
  styleUrls: ['./seeker-form.component.css']
})
export class SeekerFormComponent implements OnInit {

  editRoute;
  user={
    contacts: []
  };
    error: any='';
    errordata: any;
    cvError: any;
    user_id;
    selfile = null;
    contactTypes: [];
    details: FormGroup = this.fb.group({
      user: this.fb.group({
        id: [''],
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        password_confirmation: ['', Validators.required],
      }, {validators: PasswordValidator}),
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
        this.route.paramMap.subscribe(params => {
          this.user_id=params.get('id');
          this.getSeeker(params.get('id')).subscribe((data)=>{
            this.user = data.data;
            this.details ? this.details.patchValue(data.data) : null;
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
      this.seekerService.updateSeeker(this.user_id, this.details.value)
        .subscribe(result => {
          this.error = "";
        },
        err => {
          this.error = err;
        });

        this.userService.updateUser(this.user_id, this.details.get('user').value)
        .subscribe((data) => {
          this.errordata = "";
        },
        err=>{
            this.errordata = err;
        });
        if (!this.error && !this.errordata) {
          this.router.navigateByUrl(`/admin/seeker/show/${this.user_id}`);
        }
    }
    else
    {
      let seekerData = {
          name: this.details.value.user.name,
          email: this.details.value.user.email,
          password: this.details.value.user.password,
          password_confirmation: this.details.value.user.password_confirmation,
          phone: this.details.value.phone,
          address: this.details.value.address,
          city: this.details.value.city,
          seniority: this.details.value.seniority,
          expYears: this.details.value.expYears,
          currentJob: this.details.value.currentJob,
          currentSalary: this.details.value.currentSalary,
          expectedSalary: this.details.value.expectedSalary,
          contacts: this.details.value.contacts,
        };

      this.seekerService.createSeeker(seekerData)
        .subscribe(result => {
          this.user = result.data;
          this.error = '';
          this.router.navigateByUrl(`/admin/seeker/show/${result.data.user.id}`);
        },
          err => {
            this.error = err;
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
    return this.details.get('user').get('name');
  }
  get email() {
    return this.details.get('user').get('email');
  }
  get password() {
    return this.details.get('user').get('password');
  }
  get password_confirmation() {
    return this.details.get('user').get('password_confirmation');
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
