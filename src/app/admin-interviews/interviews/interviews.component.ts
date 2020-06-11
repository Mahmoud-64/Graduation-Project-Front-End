import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../services/interview.service';


@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit {

  interviews = [];
  filterParams = {
    page: 1,
    perPage: 15,
    orderBy: "",
    orderStyle: "asc"
  }
  constructor(
    private interviewService: InterviewService
  ) { }

  ngOnInit(): void {
    this.interviewService.getAllInterviews(this.filterParams).subscribe(
      result => {
        this.interviews = result.data;
      },
      error => {

      }
    )
  }

  deleteInterview(interviewId)
  {
    this.interviewService.deleteInterview(interviewId).subscribe(
      result=>{
        this.ngOnInit()  
      }
    )
  }
  // nextPage() {
  //   this.filterParams.page += 1
  //   this.ngOnInit();

  // }

  // prevPage() {
  //   this.filterParams.page -= 1
  //   this.ngOnInit();
  // }

  orderInterviews(element) {
    if (this.filterParams.orderBy == element) {
      this.filterParams.orderStyle == "desc" ?
        this.filterParams.orderStyle = "asc" :
        this.filterParams.orderStyle = "desc";
    } else {
      this.filterParams.orderBy = element;
    }
    this.filterParams.page = 1;
    this.ngOnInit()
  }

}
