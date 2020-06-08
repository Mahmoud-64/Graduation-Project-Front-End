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

  perPage=15;
  next: number=0;
  prev: number=0;
  currentPage: number=0;
  constructor(private contactService: ContactService,
    private router: Router) { }

  // ngOnInit(): void {
  //   this.contactService.getContactTypes().subscribe(contactTypes => {
  //     this.contactTypes = contactTypes['data'];
  //   })
  // }

  ngOnInit(): void {
    this.getContactTypes({perPage:this.perPage});
  }

  gotoPrev(){
    this.getContactTypes({perPage:this.perPage, page: this.prev});
  }
  gotoNext(){
    this.getContactTypes({perPage:this.perPage, page: this.next});
  }

  getContactTypes(params={}){
    this.contactService.getContactTypes(params).subscribe(contactTypes => {
      console.log(contactTypes);
      
      this.contactTypes = contactTypes['data'];
      this.currentPage = contactTypes['meta'].current_page;
      let links = contactTypes['links'];
      this.prev = links.prev?(this.currentPage-1):0;
      this.next = links.next?(this.currentPage+1):0;
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
