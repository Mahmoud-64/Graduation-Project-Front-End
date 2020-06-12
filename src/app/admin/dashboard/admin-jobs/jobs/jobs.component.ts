import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/home/services/jobs.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/admin/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs = [];
  filterParams = {
    page: 1,
    available: 1,
    perPage: 15,
    orderBy: "",
    orderStyle: "asc"
  }
  lastPage: number;
  constructor(
    private jobsService: JobsService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.jobsService.getAllJobs(this.filterParams).subscribe(
      result => {
        this.jobs = result.data;
        this.filterParams.page = result.meta.current_page;
        this.lastPage = result.meta.last_page;

      },
      error => {
      }
    );
  }

  showJob(jobId) {
    this.router.navigateByUrl('/admin/jobs/' + jobId);

  }

  deleteJob(jobId) {

    this.jobsService.deleteJob(jobId).subscribe(
      result => {
        this.ngOnInit();
      },
      error => {
      }
    )
  }
  changeAvailable() {
    if (this.filterParams.available == 1) {
      this.filterParams.available = 0
    } else {
      this.filterParams.available = 1
    }
    this.filterParams.page = 1;
    this.ngOnInit();
  }

  orderjobs(element) {
    if (this.filterParams.orderBy == element) {
      this.filterParams.orderStyle == "desc" ?
        this.filterParams.orderStyle = "asc" :
        this.filterParams.orderStyle = "desc";
    } else {
      this.filterParams.orderBy = element;
    }
    this.filterParams.page = 1;
    this.ngOnInit()
  }

  nextPage() {
    this.filterParams.page += 1
    this.ngOnInit();

  }

  prevPage() {
    this.filterParams.page -= 1
    this.ngOnInit();
  }
  confirmDelete(data) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.data = "the job " + data.title;
    modalRef.result.then(
      result => {
        this.deleteJob(data.id);
      },
      rejected => {
      }
    )
  }

}
