import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/home/services/jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs = [];
  private filterParams = {
    page: 1,
    available: 1,
    perPage: 15,
    orderBy: "",
    orderStyle: "asc"
  }
  lastPage: number;
  constructor(
    private jobsService: JobsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.jobsService.getAllJobs(this.filterParams).subscribe(
      result => {
        this.jobs = result.data;
        console.log(result.data);
        this.filterParams.page = result.meta.current_page;
        this.lastPage = result.meta.last_page;

      },
      error => {
        console.log(error);

      }
    );
  }

  showJob(jobId) {
    console.log(jobId);
    this.router.navigateByUrl('/admin/jobs/' + jobId);

  }

  deleteJob(jobId) {
    this.jobsService.deleteJob(jobId).subscribe(
      result => {
        console.log(result);
        this.ngOnInit();
      },
      error => {
        console.log(error);
      }
    )
  }
  changeAvailable() {
    if (this.filterParams.available == 1) {
      this.filterParams.available = 0
    } else {
      this.filterParams.available = 1
    }
    this.filterParams.page=1;
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
    console.log(this.filterParams);
    this.filterParams.page = 1;
    this.ngOnInit()
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

}
