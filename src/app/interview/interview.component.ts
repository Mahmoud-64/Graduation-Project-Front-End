import { Component, OnInit } from '@angular/core';
import { InterviewListComponent } from './interview-list/interview-list.component'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  // onCreatePost(postData: { title: string; content: string }) {
  //   // Send Http request

  //   this.http
  //     .post(
  //       'http://localhost:8000/api/interview',
  //       postData,
  //       // { headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'true' }) }
  //     )
  //     .subscribe(responseData => {
  //       console.log(responseData);
  //     });
  // }
}
