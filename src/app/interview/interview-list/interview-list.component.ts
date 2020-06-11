import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../interview.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css'],
  providers: [InterviewService]
})

export class InterviewListComponent implements OnInit {
  delete(id: number) {
    this.interviewService.deleteInterview(id)
      .subscribe(posts => {
        this.ngOnInit()
      });
  }

  constructor(
    public interviewService: InterviewService,
    private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.interviewService.fetchInterview();
  }
}






