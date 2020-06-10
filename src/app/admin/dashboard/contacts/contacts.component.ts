import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from './../../../profile/contact/service/contact.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts;
  error;

  perPage = 15;
  next: number = 0;
  prev: number = 0;
  currentPage: number = 0;
  constructor(private contactService: ContactService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getContacts({ perPage: this.perPage });
  }

  gotoPrev() {
    this.getContacts({ perPage: this.perPage, page: this.prev });
  }
  gotoNext() {
    this.getContacts({ perPage: this.perPage, page: this.next });
  }

  getContacts(params = {}) {
    this.contactService.getContacts(params).subscribe(contacts => {
      this.contacts = contacts['data'];
      this.currentPage = contacts['meta'].current_page;
      let links = contacts['links'];
      this.prev = links.prev ? (this.currentPage - 1) : 0;
      this.next = links.next ? (this.currentPage + 1) : 0;
    })
  }

  contactChanged() {
    this.getContacts();
  }

  id = '';
  clickType = '';
  closeResult = '';
  open(content, clickType, id = '') {
    this.id = id;
    this.clickType = clickType;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  deleteContact(id) {
    this.contactService.deleteContact(id).subscribe(result => {
      this.error = result['data'];
      this.contactService.getContacts().subscribe(contact => {
        this.contacts = contact['data'];
      })
    });
  }

}
