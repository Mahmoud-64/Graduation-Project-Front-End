import { Component, OnInit, Input } from '@angular/core';
import { InterviewService } from '../interview.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'interview-item',
  templateUrl: './interview-item.component.html',
  styleUrls: ['./interview-item.component.css'],
  providers: [InterviewService]

})
export class EmpInterviewItemComponent implements OnInit {
  single: any = {};
  id = 0;
  @Input() newInterview?;
  constructor(public interviewService: InterviewService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    if (this.newInterview) {
      this.single = this.newInterview;
    } else {
      this.route.params
        .subscribe((params: Params) => {
          this.id = params['id'];
          console.log(this.id);

          this.interviewService.fetchSingleInterview(this.id).subscribe(interview => {
            // this.isFetching = false;
            // this.loadedInterview = interviews;
            // console.log(interview['data']);
            this.single = interview['data']
            // this.singleInterview = interview;
            // console.log(this.singleInterview['data']);

            // return this.singleInterview;
            console.log(this.single);

          }
          )
        });
    }


    // this.single = this.interviewService.fetchSingleInterview(4);
    // this.single = this.interviewService.singleInterview;


  }


}
