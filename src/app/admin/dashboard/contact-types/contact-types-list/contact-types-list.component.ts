import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../../../profile/contact/service/contact.service';

@Component({
  selector: 'app-contact-types-list',
  templateUrl: './contact-types-list.component.html',
  styleUrls: ['./contact-types-list.component.css']
})
export class ContactTypesListComponent implements OnInit {
  contactTypes;
  error;
  constructor(private contactService: ContactService,
    private router: Router) { }

  ngOnInit(): void {
    this.contactService.getContactTypes().subscribe(contactTypes => {
      this.contactTypes = contactTypes['data'];
    })
  }
  crudOperation(crudName, id) {
    switch (crudName) {
      case 'new':
        console.log('new', '');
        this.router.navigateByUrl(`/admin/contacttype/new`);
        break;
      case 'show':
        console.log('show', id);
        this.router.navigateByUrl(`/admin/contacttype/${id}`);
        break;
      case 'edit':
        console.log('edit');
        this.router.navigateByUrl(`/admin/contacttype/edit/${id}`);
        break;
      case 'delete':
        console.log('delete');
        this.contactService.deleteContactType(id).subscribe(result => {
          this.error = result['data'];
          this.contactService.getContactTypes().subscribe(contactTypes => {
            this.contactTypes = contactTypes['data'];
          })
        });
        break;
    }
  }

}
