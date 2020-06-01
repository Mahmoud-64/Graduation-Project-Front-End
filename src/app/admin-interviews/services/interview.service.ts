import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  private getAllInterviewsUrl = "/api/interviews";
  private getsingeInterviewUrl = "/api/interview/";
  private getAllLevelsUrl='/api/levels'
  constructor(private http:HttpClient) { }

  getAllInterviews(){
    return this.http.get<any>(this.getAllInterviewsUrl);
  }

  addNewInterview(interview){
    return this.http.post<any>(this.getsingeInterviewUrl, interview)
  }

  deleteInterview(interview) {
    return this.http.delete<any>(this.getsingeInterviewUrl+ interview)
  }

  getAllLevels(){
    return this.http.get<any>(this.getAllLevelsUrl);
  }

  getInterview(interview) {
    return this.http.get<any>(this.getsingeInterviewUrl+ interview)
  }

}
