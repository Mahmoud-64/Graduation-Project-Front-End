import { Component, OnInit, Input } from '@angular/core';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../service/contact.service';
import { contact } from '../../../models/contact';
import {
  FormBuilder,
  FormGroup,
  FormArray
} from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  subscriptions: Subscription[] = [];
  contactTypes: Array<any> = [];
  contact: FormArray = this.fb.array([]);
  @Input() inputContact: contact;

  constructor(public contactService: ContactService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    // get contact types
    this.contactService.getContactTypes().subscribe(contact => {
      this.contactTypes = contact['data'];
    });
  }
  

  submitContact() {
    this.contactService.addContact(this.contact.value)
      .subscribe(result => {
        // this.contactTypes=contact['data'];
      });
  }

  addContact(){
    this.contact.push(this.newContact());
  }
  removeContact(index){
    this.contact.removeAt(index);
  }
  
  newContact(): FormGroup {
    return this.fb.group({
      contact_types_id: '',
      data: '',
    })
 }

}
