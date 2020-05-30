import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service'
import { Router } from '@angular/router';
@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  clicked = 0;
  jobs = [];
  filterParams = {
    page: 1,
    available: 1,
    perPage:5,
  }
  isDataLoaded: boolean = false;
  lastPage: number;
  firstElementId;
  constructor(
    private jobService: JobsService,
    private router: Router
  ) {
    this.subscribeJobSubject();
  }

  ngOnInit(): void {
    this.jobService.getAllJobs(this.filterParams).subscribe(
      result => {
        this.jobs = result.data;
        this.isDataLoaded = true;
        this.clicked = this.jobs[0]['id'];
        this.filterParams.page = result.meta.current_page;
        this.lastPage = result.meta.last_page;
        if (result.data.length > 0) {
          this.renderFirstJob(result.data);
        }
        else {
          this.router.navigateByUrl('/jobs')
        }
      },
      error => {
        console.log(error);
      }
    )

  }

  subscribeJobSubject() {
    this.jobService.jobSubject.subscribe(
      next => {

        console.log("subject hit", next);
        this.filterParams = { ...this.filterParams, ...next };

        console.log('after merg', this.filterParams);
        this.ngOnInit();

      }
    );
  }

  changeFilterParams() {
  }
  renderFirstJob(jobs) {
    this.firstElementId = jobs[0].id;
    this.router.navigateByUrl('/jobs/' + this.firstElementId);
    console.log('first id ' + this.firstElementId);
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

  wantPage(n) {
    if (n > 0 && this.filterParams.page) {
      this.filterParams.page = n;
      this.ngOnInit();
    }
  }

  pageNumbers(): number[] {
    let startFrom = this.filterParams.page - 2;
    startFrom = this.filterParams.page - 2 >= 1 ? startFrom : 1;
    let n = this.filterParams.page + 2;
    n = this.filterParams.page + 2 <= this.lastPage ? n : this.lastPage;
    let numbers = [];

    for (let index = startFrom; index <= n; index++) {
      numbers.push(index);
    }
    return numbers;
  }

}
