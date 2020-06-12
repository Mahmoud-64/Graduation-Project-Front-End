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
  url=null;
  @Input() newInterview?;
  constructor(
    public interviewService: InterviewService,
    private route: ActivatedRoute,
    private interview: Interview,
    private userService: UserService) { }
  ngOnInit(): void {
    this.userRole = this.userService.getUserRole();
    if (this.newInterview) {
      this.single = this.newInterview;
      if (this.userRole == 3) {
        this.interview.changeInterviewData.subscribe(interview => {
          this.single = interview;
        })
      }
      this.url=this.single['emp_image'];
    }
    else {
      this.route.params
        .subscribe((params: Params) => {
          this.id = params['id'];
          this.interviewService.fetchSingleInterview(this.id).subscribe(interview => {
            this.single = interview['data']
            this.url=this.single['emp_image'];
          })
        });
    }
  }
}
