import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private getAllJobsUrl = "http://127.0.0.1:8001/api/jobs";
  private getSingleJobUrl = "http://127.0.0.1:8001/api/jobs/";
  constructor(private http:HttpClient) { }

  getAllJobs(){  
    return this.http.get<any>(this.getAllJobsUrl);
  }

  getSingleJob(id:string){
    return this.http.get<any>(this.getSingleJobUrl+id);
  }
}
