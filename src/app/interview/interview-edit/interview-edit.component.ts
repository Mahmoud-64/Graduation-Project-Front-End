import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterviewService } from '../interview.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-interview-edit',
  templateUrl: './interview-edit.component.html',
  styleUrls: ['./interview-edit.component.css'],
  providers: [InterviewService]
})
export class InterviewEditComponent implements OnInit {
  // arr: any[]=[];
  apps: any;
  levels: any;
  employees: any;
  single: any = {};
  id = 0;
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


  constructor(private http: HttpClient, public interviewService: InterviewService, private route: ActivatedRoute, private router: Router, private _flashMessagesServicee: FlashMessagesService) { }
  defaultQuestion = 'teacher';
  genders = ['male', 'female', 'a', 'b'];
  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request

    this.interviewService.updateInterview(this.id, postData)
      .subscribe(
        responseData => {
          console.log(responseData);
          this._flashMessagesServicee.show('Record saved successfully', { cssClass: 'alert-success', timeout: 2000 });
          // this.router.navigate(["/admin/interviews"]);
          setTimeout(() => {
            this.router.navigate(["/admin/interviews"]);
          }, 2000);
        }, error => {
          this.error = error;
          // console.log(this.error.errors.application_id);
          this._flashMessagesServicee.show('error', { cssClass: 'alert-danger', timeout: 1000 });
        }
      );
  }
  ngOnInit() {

    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        console.log(this.id);

        this.interviewService.fetchSingleInterview(this.id).subscribe(interview => {
          this.single = interview['data']
          console.log(this.single);

        }
        )
      });


    this.interviewService.fetchInterview();
    // console.log(this.interviewService.fetchInterview());
    // this.arr = this.interviewService.loadedInterview[0]
    //############################
    this.http
      .get(
        '/api/applications/'
      )

      .subscribe(applications => {
        this.apps = applications['data'];
        console.log(this.apps);

      });


    this.http
      .get(
        '/api/levels/'
      )

      .subscribe(l => {
        this.levels = l['data'];
        console.log(this.levels);

      });

    this.http
      .get(
        '/api/employees/'
      )

      .subscribe(emp => {
        this.employees = emp['data'];
        console.log(this.employees);

      });


  }

}
