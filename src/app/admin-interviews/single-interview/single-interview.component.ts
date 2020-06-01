import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../services/interview.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-interview',
  templateUrl: './single-interview.component.html',
  styleUrls: ['./single-interview.component.css']
})
export class SingleInterviewComponent implements OnInit {

  interview;
  constructor(
    private interviewSerrvice: InterviewService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(routParams => {
      this.interviewSerrvice.getInterview(routParams.id).subscribe(
        result => {
          console.log(result);
          this.interview=result.data;

        },
        error => {
          console.log(error);

        }
      )
    })
  }

}
