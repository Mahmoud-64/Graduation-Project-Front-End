import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  job = {
    "id":"",
    "title": "",
    "description":"",
    "seniority":"",
    "requirements" : ""
  } ;
  constructor(
    private jobService:JobsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    // let jobId = this.route.snapshot.params.id;
    this.route.params.subscribe(routeParams => {
      this.jobService.getSingleJob(routeParams.id).subscribe(
        result => {
          console.log(result);
          this.job=result.data;

        },
        error => {
          console.log(error);

        }
      )
    });
    
  }
  applyJob()
  {
    console.log(this.job.id);
    this.jobService.applyJob(this.job.id).subscribe(
      result => {
        console.log(result);
        
      },
      error => {
        console.log(error);
        
      }
    )
    console.log("aftersend");
  }

}
