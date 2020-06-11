import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterviewService } from '../interview.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'review-edit',
  templateUrl: './interview-edit.component.html',
  styleUrls: ['./interview-edit.component.css'],
  providers: [InterviewService]
})
export class EmpInterviewEditComponent implements OnInit {
  // arr: any[]=[];
  apps: any;
  levels: any;
  employees: any;
  single: any = {};
  id = 0;


  constructor(private http: HttpClient, public interviewService: InterviewService, private route: ActivatedRoute, private router: Router, private _flashMessagesServicee: FlashMessagesService) { }
  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request

    this.interviewService.updateInterview(this.id, postData)
      .subscribe(
        responseData => {
          // console.log(responseData);
          this._flashMessagesServicee.show('Record saved successfully', { cssClass: 'alert-success', timeout: 2000 });
          setTimeout(() => {
            this.router.navigate(["/emprev"]);
          }, 2000);
        }
      );
  }
  ngOnInit() {

    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        // console.log(this.id);

        this.interviewService.fetchSingleInterview(this.id).subscribe(interview => {
          this.single = interview['data']
          // console.log(this.single);

        }
        )
      });


    this.interviewService.fetchInterview();
    // console.log(this.interviewService.fetchInterview());
    // this.arr = this.interviewService.loadedInterview[0]
    // //############################
    // this.http
    //   .get(
    //     '/api/applications/'
    //   )

    //   .subscribe(applications => {
    //     this.apps = applications;
    //     console.log(this.apps);

    //   });


    // this.http
    //   .get(
    //     '/api/levels/'
    //   )

    //   .subscribe(l => {
    //     this.levels = l;
    //     console.log(this.levels);

    //   });

    // this.http
    //   .get(
    //     '/api/employees/'
    //   )

    //   .subscribe(emp => {
    //     this.employees = emp;
    //     console.log(this.employees);

    //   });


  }

}
