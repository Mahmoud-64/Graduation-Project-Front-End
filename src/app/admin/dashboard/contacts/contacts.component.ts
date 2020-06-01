import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from './../../../profile/contact/service/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts;
  constructor(private contactService: ContactService,
    private router: Router) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(contact=>{
      this.contacts = contact['data'];
      console.log(contact['data']);
    })
  }

  crudOperation(crudName, id) {
    switch (crudName) {
      case 'new':
        console.log('new', id);
        this.router.navigateByUrl(`/admin/contact/new`);
        break;
      case 'show':
        console.log('show', id);
        this.router.navigateByUrl(`/admin/contact/${id}`);
        break;
      case 'edit':
        console.log('edit');
        this.router.navigateByUrl(`/admin/contact/edit/${id}`);
        break;
      case 'delete':
        console.log('delete');
        this.contactService.deleteContact(id).subscribe(result => {
          this.contactService.getContacts().subscribe(contact=>{
            this.contacts = contact['data'];
            console.log(contact['data']);
          })
        });
        break;
    }
  }

}
