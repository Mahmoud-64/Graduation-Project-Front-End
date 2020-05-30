import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/home/services/jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs=[];
  private filterParams = {
    page: 1,
    available: 1,
    perPage: 15,
  }
  constructor(
    private jobsService:JobsService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.jobsService.getAllJobs(this.filterParams).subscribe(
      result=>{
        this.jobs=result.data;
      },
      error=>{
        console.log(error);
        
      }
    );
  }

  showJob(jobId){
    console.log(jobId);
    this.router.navigateByUrl('/admin/jobs/'+jobId);
    
  }

  deleteJob(jobId){
    this.jobsService.deleteJob(jobId).subscribe(
      result=>{
        console.log(result);  
        this.ngOnInit();      
      },
      error=>{
        console.log(error);
      }
    )
  }

}
