import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelsService } from '../../../service/levels.service';

@Component({
  selector: 'app-interview-levels',
  templateUrl: './interview-levels.component.html',
  styleUrls: ['./interview-levels.component.css']
})
export class InterviewLevelsComponent implements OnInit {
  levels;
  error;

  perPage=15;
  next: number=0;
  prev: number=0;
  currentPage: number=0;
  constructor(private router: Router,
    private levelsService: LevelsService) { }

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
    this.levelsService.getLevels(params).subscribe(levels => {
      this.levels = levels['data'];
      this.currentPage = levels['meta'].current_page;
      let links = levels['links'];
      this.prev = links.prev?(this.currentPage-1):0;
      this.next = links.next?(this.currentPage+1):0;
    })
  }

  crudOperation(crudName, id) {
    switch (crudName) {
      case 'new':
        console.log('new', id);
        this.router.navigateByUrl(`/admin/levels/new`);
        break;
      case 'show':
        console.log('show', id);
        this.router.navigateByUrl(`/admin/levels/${id}`);
        break;
      case 'edit':
        console.log('edit');
        this.router.navigateByUrl(`/admin/levels/edit/${id}`);
        break;
      case 'delete':
        this.levelsService.deleteLevel(id).subscribe(
          result => {
            this.error = result["data"];
            this.levelsService.getLevels().subscribe(result => {
              this.levels = result["data"];
            });
          });
        break;
    }
  }

}
