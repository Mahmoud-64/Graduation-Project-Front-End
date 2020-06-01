import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterviewService } from '../interview.service';
import { Params, ActivatedRoute } from '@angular/router';

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


  constructor(private http: HttpClient, public interviewService: InterviewService, private route: ActivatedRoute) { }
  defaultQuestion = 'teacher';
  genders = ['male', 'female', 'a', 'b'];
  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request

    this.http
      .put(
        'http://localhost:8000/api/interview/' + this.id,
        postData,
        // { headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'true' }) }
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
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
