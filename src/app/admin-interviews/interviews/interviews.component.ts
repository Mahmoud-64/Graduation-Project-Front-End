import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../services/interview.service';


@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit {

  interviews = [];
  constructor(
    private interviewService: InterviewService
  ) { }

  ngOnInit(): void {
    this.interviewService.getAllInterviews().subscribe(
      result => {
        this.interviews = result.data;
        console.log(result.data);
      },
      error => {
        console.log(error);

      }
    )
  }

  deleteInterview(interviewId)
  {
    this.interviewService.deleteInterview(interviewId).subscribe(
      result=>{
        console.log(result);
        this.ngOnInit()  
      }
    )
  }

}
