import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterviewService } from '../interview.service';

@Component({
  selector: 'app-interview-form',
  templateUrl: './interview-form.component.html',
  styleUrls: ['./interview-form.component.css'],
  providers: [InterviewService]
})
export class InterviewFormComponent implements OnInit {
  // arr: any[]=[];
  apps: any;
  levels: any;


  constructor(private http: HttpClient, public interviewService: InterviewService) { }
  defaultQuestion = 'teacher';
  genders = ['male', 'female', 'a', 'b'];
  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request

    this.http
      .post(
        'http://localhost:8000/api/interview',
        postData,
        // { headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'true' }) }
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
  ngOnInit() {
    this.interviewService.fetchInterview();
    // console.log(this.interviewService.fetchInterview());
    // this.arr = this.interviewService.loadedInterview[0]
    //############################
    this.http
      .get(
        '/api/applications/'
      )

      .subscribe(applications => {
        this.apps = applications;
        console.log(this.apps);

      });


    this.http
      .get(
        '/api/levels/'
      )

      .subscribe(l => {
        this.levels = l;
        console.log(this.levels);

      });



  }

}
