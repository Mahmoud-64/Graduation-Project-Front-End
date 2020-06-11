import { Component, OnInit, Input } from '@angular/core';
import { InterviewService } from '../interview.service';
import { ActivatedRoute, Params } from '@angular/router';
import { InterviewService as Interview } from '../../admin-interviews/services/interview.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-interview-item',
  templateUrl: './interview-item.component.html',
  styleUrls: ['./interview-item.component.css'],
  providers: [InterviewService]

})
export class InterviewItemComponent implements OnInit {
  single: any = {};
  id = 0;
  userRole;
  @Input() newInterview?;
  constructor(public interviewService: InterviewService, private route: ActivatedRoute,
    private interview: Interview,
    private userService: UserService) {

  }

  ngOnInit(): void {
    this.userRole = this.userService.getUserRole();
    if (this.newInterview) {
      this.single = this.newInterview;
      if (this.userRole == 3) {
        this.interview.changeInterviewData.subscribe(interview => {
          this.single = interview;
          console.log(interview);
        })
      }
    }
    else {
      this.route.params
        .subscribe((params: Params) => {
          this.id = params['id'];
          console.log(this.id);

          this.interviewService.fetchSingleInterview(this.id).subscribe(interview => {
            // this.isFetching = false;
            // this.loadedInterview = interviews;
            // console.log(interview['data']);
            this.single = interview['data']
            // console.log(this.single);

            // this.singleInterview = interview;
            // console.log(this.singleInterview['data']);

            // return this.singleInterview;

          }
          )
        });
    }


    // this.single = this.interviewService.fetchSingleInterview(4);
    // this.single = this.interviewService.singleInterview;


  }


}
