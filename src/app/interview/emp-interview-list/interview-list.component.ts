import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../interview.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css'],
  providers: [InterviewService]
})
export class EmpInterviewListComponent implements OnInit {

  constructor(
    public interviewService: InterviewService,
    private _flashMessagesService: FlashMessagesService
  ) { }
  ngOnInit() {
    this.interviewService.fetchInterview();
  }
}






