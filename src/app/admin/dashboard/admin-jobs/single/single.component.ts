import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/home/services/jobs.service';
import { ApplicationService } from 'src/app/job-application/services/application.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

  job = {
    "id": "",
    "title": "",
    "description": "",
    "seniority": "",
    "years_exp": "",
    "requirements": ""
  };
  isDataLoaded:boolean=false;
  constructor(
    private jobService: JobsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(routeParams => {
      this.jobService.getSingleJob(routeParams.id).subscribe(
        result => {
          console.log(result);
          this.job = result.data;   
          this.isDataLoaded=true;
        },
        error => {
          console.log(error);
        }
      )
    });

  }
  

}
