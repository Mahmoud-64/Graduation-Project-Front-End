import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobModalComponent } from '../job-modal/job-modal.component';

@Component({
  selector: 'home-jobs',
  templateUrl: './home-jobs.component.html',
  styleUrls: ['./home-jobs.component.css']
})
export class HomeJobsComponent implements OnInit {

  jobs = [];
  filterParams = {
    page: 1,
    available: 1,
    perPage: 12,
  }
  isDataLoaded: boolean = false;
  lastPage: number;
  firstElementId;

  constructor(
    private jobService: JobsService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.subscribeJobSubject();
  }

  ngOnInit(): void {
    this.jobService.getAllJobs(this.filterParams).subscribe(
      result => {
        this.jobs = result.data;
        this.isDataLoaded = true;
        this.filterParams.page = result.meta.current_page;
        this.lastPage = result.meta.last_page;
      },
      error => {
        console.log(error);
      }
    )
  }
  subscribeJobSubject() {
    this.jobService.jobSubject.subscribe(
      next => {
        this.filterParams.page = 1;
        console.log("subject hit", next);
        this.filterParams = { ...this.filterParams, ...next };

        console.log('after merg', this.filterParams);
        this.ngOnInit();

      }
    );
  }
  nextPage() {
    this.filterParams.page += 1
    this.ngOnInit();
    console.log('next ' + this.filterParams.page);

  }

  prevPage() {
    this.filterParams.page -= 1
    this.ngOnInit();
    console.log('prev ' + this.filterParams.page);
  }

  openModal(job){
    const modalRef = this.modalService.open(JobModalComponent);
    modalRef.componentInstance.job = job;
  }

}
