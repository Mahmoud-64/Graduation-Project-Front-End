import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../../profile/contact/service/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  contact;
  contact_id;
  constructor(private contactService: ContactService,
    private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.contact_id = +params.get('Id');
      console.log(this.contact_id);
    });
    this.contactService.getContact(this.contact_id).subscribe(contact => {
      this.contact = contact;
    })
  }

}
