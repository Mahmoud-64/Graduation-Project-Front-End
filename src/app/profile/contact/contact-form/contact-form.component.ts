import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  contactTypes: Array<any> = [];
  contact = {
    data: '',
    contact_types_id: ''
  }
  constructor(public contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContactTypes().subscribe(contact => {
      this.contactTypes = contact['data'];
      console.log(this.contactTypes);
    });
  }

  addContact() {
    console.log("clicked", this.contactService.user_id);
    // console.log("data", this.contact);

    this.contactService.addContact(this.contact)
    .subscribe(result=>{
      // this.contactTypes=contact['data'];
      console.log(result);
    });
  }

}
