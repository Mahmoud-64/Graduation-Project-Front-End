import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service'
@Component({
  selector: 'job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs = [] ;
  constructor(private jobService: JobsService) { }

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe(
      result =>{
        console.log("succes");
        
        
        this.jobs = result.data
        console.log(this.jobs);
      },
      error => {
        console.log("error");
        
        console.log(error);
        
      }
    )
  }

}
