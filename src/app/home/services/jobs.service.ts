import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private getAllJobsUrl = "/api/jobs";
  private getSingleJobUrl = "/api/jobs/";
  private applyToJobUrl = "/api/applications"
  

  constructor(private http:HttpClient) { }

  getAllJobs(filterParams){  
    // return this.http.get<any>(this.getAllJobsUrl+'?page='+page);
    return this.http.get<any>(this.getAllJobsUrl ,{
      params: filterParams
    });
  }

  getSingleJob(id:string){
    return this.http.get<any>(this.getSingleJobUrl+id);
  }

  applyJob(jobId){
    return this.http.post<any>(this.applyToJobUrl,{
      job_id : jobId
    });
  }

  addNewJob(job)
  {
    return this.http.post<any>(this.getAllJobsUrl,job);
  }

  jobSubject = new Subject<any>();
}
