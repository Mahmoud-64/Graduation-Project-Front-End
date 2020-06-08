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
  error;

  perPage=15;
  next: number=0;
  prev: number=0;
  currentPage: number=0;
  constructor(private contactService: ContactService,
    private router: Router) { }

  ngOnInit(): void {
    this.getContacts({perPage:this.perPage});
  }

  gotoPrev(){
    this.getContacts({perPage:this.perPage, page: this.prev});
  }
  gotoNext(){
    this.getContacts({perPage:this.perPage, page: this.next});
  }

  getContacts(params={}){
    this.contactService.getContacts(params).subscribe(contacts => {
      this.contacts = contacts['data'];
      this.currentPage = contacts['meta'].current_page;
      let links = contacts['links'];
      this.prev = links.prev?(this.currentPage-1):0;
      this.next = links.next?(this.currentPage+1):0;
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
          this.error = result['data'];
          this.contactService.getContacts().subscribe(contact=>{
            this.contacts = contact['data'];
            console.log(contact['data']);
          })
        });
        break;
    }
  }

}
