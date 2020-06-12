import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../interview.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable, Subject, pipe, of, throwError } from 'rxjs';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css'],
  providers: [InterviewService]
})
export class EmpInterviewListComponent implements OnInit {
  interviews;
  interviewDate = [];
  public now: Date = new Date();
  flag = true;
  constructor(
    public interviewService: InterviewService,
    private _flashMessagesService: FlashMessagesService
  )
  {
    setInterval(() => {
      this.now = new Date();
        }, 3000);
  }
  ngOnInit() {
    this.interviewService.fetchInterview();
      this.interviewService.getInterviews().subscribe((data)=>{
        this.interviews = data["data"];
        this.interviewDate = this.interviews.map(interview=>this.now > new Date(interview["date"]));
      });
  }

  showInterviews()
  {
    this.flag = !this.flag;
    return this.flag;
  }

}
