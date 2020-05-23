import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-interview-form',
  templateUrl: './interview-form.component.html',
  styleUrls: ['./interview-form.component.css']
})
export class InterviewFormComponent implements OnInit {

  constructor(private http: HttpClient) { }
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
  ngOnInit(): void {
  }

}
