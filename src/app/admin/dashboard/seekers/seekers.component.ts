import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeekerService } from '../../../service/seeker.service';
import { Seeker } from '../../../models/seeker';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-seekers',
  templateUrl: './seekers.component.html',
  styleUrls: ['./seekers.component.css']
})
export class SeekersComponent implements OnInit {
  seekers: Array<Seeker>;
  changed=true;
  perPage=15;
  next: number=0;
  prev: number=0;
  currentPage: number=0;
  constructor(
    private seekerService: SeekerService,
    private router: Router,
    private modalService: NgbModal
) { }

  ngOnInit(): void {
    this.getSeekers({perPage:this.perPage});
  }

  gotoPrev(){
    this.getSeekers({perPage:this.perPage, page: this.prev});
  }
  gotoNext(){
    this.getSeekers({perPage:this.perPage, page: this.next});
  }

  getSeekers(params={}){
    this.seekerService.getSeekers(params).subscribe(seekers => {
      this.seekers = seekers.data;
      this.currentPage = seekers.meta.current_page;
      let links = seekers.links;
      this.prev = links.prev?(this.currentPage-1):0;
      this.next = links.next?(this.currentPage+1):0;
    })
  }

  crudOperation(crudName, id) {
    switch (crudName) {
      case 'new':
        this.router.navigateByUrl(`/admin/seeker/new`);
        break;
      case 'show':
        this.router.navigateByUrl(`/admin/seeker/show/${id}`);
        break;
      case 'edit':
        this.router.navigateByUrl(`/admin/seeker/edit/${id}`);
        break;
      case 'delete':
        this.seekerService.deleteSeeker(id).subscribe(result=>{
          this.seekerService.getSeekers({perPage:this.perPage, page: this.currentPage}).subscribe(seekers => {
            this.seekers = seekers.data;
          })
        });

        break;
    }
  }

  confirmDelete(data) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.data = "the user " + data.name;
    modalRef.result.then(
      result => {
        this.crudOperation('delete', data.id);
      },
      rejected => {
      }
    )
  }


}
