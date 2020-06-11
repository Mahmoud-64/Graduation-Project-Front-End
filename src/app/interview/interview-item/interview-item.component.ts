import { Component, OnInit, Input } from '@angular/core';
import { InterviewService } from '../interview.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-interview-item',
  templateUrl: './interview-item.component.html',
  styleUrls: ['./interview-item.component.css'],
  providers: [InterviewService]
})

export class InterviewItemComponent implements OnInit {
  single: any = {};
  id = 0;
  @Input() newInterview?;

  constructor(
    public interviewService: InterviewService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    if (this.newInterview) {
      this.single = this.newInterview;
    } else {
      this.route.params
        .subscribe((params: Params) => {
          this.id = params['id'];
          this.interviewService.fetchSingleInterview(this.id).subscribe(interview => {
            this.single = interview['data']
          })
        });
    }
  }
}
