import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../../profile/contact/service/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-types-item',
  templateUrl: './contact-types-item.component.html',
  styleUrls: ['./contact-types-item.component.css']
})
export class ContactTypesItemComponent implements OnInit {
  contactType;
  contact_type_id;
  constructor(private contactService: ContactService,
    private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.contact_type_id = +params.get('Id');
    });
    this.contactService.getContactType(this.contact_type_id).subscribe(contactType => {
      this.contactType = contactType['data'];
    })
  }

}
