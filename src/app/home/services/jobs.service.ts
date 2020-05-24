import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private getAllJobsUrl = "/api/jobs";
  private getSingleJobUrl = "/api/jobs/";
  private applyToJobUrl = "/api/applications"
  

  constructor(private http:HttpClient) { }

  getAllJobs(){  
    return this.http.get<any>(this.getAllJobsUrl);
  }

  getSingleJob(id:string){
    return this.http.get<any>(this.getSingleJobUrl+id);
  }

  applyJob(jobId){
    return this.http.post<any>(this.applyToJobUrl,{
      user_id : 2,
      job_id : jobId
    });
  }

  addNewJob(job)
  {
    return this.http.post<any>(this.getAllJobsUrl,job);
  }
}
