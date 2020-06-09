import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterviewService } from '../interview.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

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
  employees: any;
  error: any = {
    errors:
      [
        { 'application_id': null },
        { 'emp_id': null },
        { 'level_id': null },
        { 'date': null },
        { 'zoom': null },
      ]
  };

  constructor(private http: HttpClient, public interviewService: InterviewService, private router: Router, private _flashMessagesService: FlashMessagesService) { }
  // defaultQuestion = 'teacher';
  // genders = ['male', 'female', 'a', 'b'];
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
        this._flashMessagesService.show('Record saved successfully', { cssClass: 'alert-success', timeout: 2000 });
        // this.router.navigate(["/admin/interviews"]);
        setTimeout(() => {
          this.router.navigate(["/admin/interviews"]);
        }, 2000);
      }, error => {
        this.error = error;
        // console.log(this.error.errors.application_id);
        this._flashMessagesService.show('error', { cssClass: 'alert-danger', timeout: 1000 });
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

    this.http
      .get(
        '/api/employees/'
      )

      .subscribe(emp => {
        this.employees = emp;
        console.log(this.employees);

      });


  }

}


