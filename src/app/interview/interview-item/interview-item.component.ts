import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../interview.service';

@Component({
  selector: 'app-interview-item',
  templateUrl: './interview-item.component.html',
  styleUrls: ['./interview-item.component.css'],
  providers: [InterviewService]

})
export class InterviewItemComponent implements OnInit {

  constructor(public interviewService: InterviewService) { }

  ngOnInit(): void {
    this.interviewService.fetchSingleInterview(4);

  }

}
