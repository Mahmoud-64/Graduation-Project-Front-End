import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ContactService } from '../../../../profile/contact/service/contact.service';
import { SeekerService } from '../../../../service/seeker.service';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  error;
  contact_id;
  contactTypes: Array<any> = [];
  seekers: Array<any> = [];
  contact: FormGroup = this.fb.group({
    id: [''],
    seeker_id: [''],
    seeker_name: [''],
    data: [''],
    contact_types_id: [''],
    contact_type: ['']
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private seekerService: SeekerService) { }

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.route.paramMap.subscribe(params => {
        this.contact_id = +params.get('Id');
      });

      this.contactService.getContact(this.contact_id).subscribe(contact => {
        this.contact.patchValue(contact);
      });
    }
    this.contactService.getContactTypes().subscribe(contact => {
      this.contactTypes = contact['data'];
    });
    this.seekerService.getSeekers().subscribe(seeker => {
      this.seekers = seeker['data'];
    });
  }

  submitContact() {
    console.log(this.contact.value);
    if (this.router.url.includes('edit')) {
      this.contactService.editContact(this.contact_id, this.contact.value)
        .subscribe(result => {
          console.log(result);
        })
    } else {
      this.contactService.addNewContact(this.contact.value)
        .subscribe(result => {
          console.log(result);
        },
        err=>{
          console.log("error",err.errors);
          this.error = err.errors;
        })
    }
  }

}
