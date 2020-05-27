import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service'
import { Router } from '@angular/router';
@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs = [];
  filterParams = {
    page: 1,
    available:1,
  }
  lastPage: number;
  firstElementId;
  constructor(
    private jobService: JobsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.jobService.getAllJobs(this.filterParams).subscribe(
      result => {
        console.log(result);
        console.log(this.filterParams);

        this.filterParams.page = result.meta.current_page;
        this.lastPage = result.meta.last_page;
        this.jobs = result.data;
        this.firstElementId = result.data[0].id;
        this.router.navigateByUrl('/jobs/' + this.firstElementId);
        console.log('first id ' + this.firstElementId);

        console.log(this.jobs);
      },
      error => {
        console.log("error");
        console.log(error);

      }
    )
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
    if (n>0 && this.filterParams.page) {
      this.filterParams.page=n;
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
