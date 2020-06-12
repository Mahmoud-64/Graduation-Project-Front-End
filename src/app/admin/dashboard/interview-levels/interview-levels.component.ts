import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelsService } from '../../../service/levels.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-interview-levels',
  templateUrl: './interview-levels.component.html',
  styleUrls: ['./interview-levels.component.css']
})
export class InterviewLevelsComponent implements OnInit {

  levels;
  error;

  perPage = 15;
  next: number = 0;
  prev: number = 0;
  currentPage: number = 0;

  constructor(private router: Router,
    private levelsService: LevelsService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getLevels({ perPage: this.perPage });
  }

  gotoPrev() {
    this.getLevels({ perPage: this.perPage, page: this.prev });
  }
  gotoNext() {
    this.getLevels({ perPage: this.perPage, page: this.next });
  }

  getLevels(params = {}) {
    this.levelsService.getLevels(params).subscribe(levels => {
      this.levels = levels['data'];
      this.currentPage = levels['meta'].current_page;
      let links = levels['links'];
      this.prev = links.prev ? (this.currentPage - 1) : 0;
      this.next = links.next ? (this.currentPage + 1) : 0;
    })
  }

  levelChanged() {
    this.getLevels();
  }

  deleteLevel(id) {
    this.levelsService.deleteLevel(id).subscribe(
      result => {
        this.error = result["data"];
        this.getLevels();
      });
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

}
