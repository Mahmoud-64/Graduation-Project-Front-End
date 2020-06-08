import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeekerService } from '../../../service/seeker.service';
import { Seeker } from '../../../models/seeker';

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
  currentPage: number=2;
  constructor(
    private seekerService: SeekerService,
    private router: Router) { }

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
        console.log('new', this.router.url);
        this.router.navigateByUrl(`/admin/seeker/new`);
        break;
      case 'show':
        console.log('show', id, this.router.url);
        this.router.navigateByUrl(`/admin/seeker/show/${id}`);
        break;
      case 'edit':
        console.log('edit');
        this.router.navigateByUrl(`/admin/seeker/edit/${id}`);
        break;
      case 'delete':
        console.log('delete');
        this.seekerService.deleteSeeker(id).subscribe(result=>{
          console.log(result);
          this.seekerService.getSeekers().subscribe(seekers => {
            this.seekers = seekers.data;
            console.log(this.seekers);
          })
        });

        break;
    }
  }

}
