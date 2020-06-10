import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../../../profile/contact/service/contact.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-types-list',
  templateUrl: './contact-types-list.component.html',
  styleUrls: ['./contact-types-list.component.css']
})
export class ContactTypesListComponent implements OnInit {
  contactTypes;
  error;

  perPage = 15;
  next: number = 0;
  prev: number = 0;
  currentPage: number = 0;
  constructor(private contactService: ContactService,
    private router: Router,
    private modalService: NgbModal) { }

  // ngOnInit(): void {
  //   this.contactService.getContactTypes().subscribe(contactTypes => {
  //     this.contactTypes = contactTypes['data'];
  //   })
  // }

  ngOnInit(): void {
    this.getContactTypes({ perPage: this.perPage });
  }

  gotoPrev() {
    this.getContactTypes({ perPage: this.perPage, page: this.prev });
  }
  gotoNext() {
    this.getContactTypes({ perPage: this.perPage, page: this.next });
  }

  getContactTypes(params = {}) {
    this.contactService.getContactTypes(params).subscribe(contactTypes => {
      this.contactTypes = contactTypes['data'];
      this.currentPage = contactTypes['meta'].current_page;
      let links = contactTypes['links'];
      this.prev = links.prev ? (this.currentPage - 1) : 0;
      this.next = links.next ? (this.currentPage + 1) : 0;
    })
  }


  contactTypeChanged() {
    this.getContactTypes();
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

  deleteContactType(id) {
    this.contactService.deleteContactType(id).subscribe(result => {
      this.error = result['data'];
      this.contactService.getContactTypes().subscribe(contactTypes => {
        this.contactTypes = contactTypes['data'];
      })
    });
  }

}
