import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { InterviewService } from '../../admin-interviews/services/interview.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.css']
})
export class AppDetailsComponent implements OnInit {

  application = {
    "id": "",
    "seeker": {
      'user': {
        'name': ""
      }
    },
    "job": {
      "title": "", "description": "", "requirements": "",
      "seniority": "", "years_exp": ""
    },
    "status": { "name": "", "description": "" },
    "interviews": [],
  };
  isAdmin: boolean = false;
  isSeeker: boolean = false;
  interviewForm: boolean = false;
  isDataLoaded: boolean = false;
  public isCollapsed = false;
  showJob;
  interviews = [];
  constructor(
    private applicationService: ApplicationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private interviewService: InterviewService,
    private location: Location
  ) {
    this.subscribeInterviews();
  }

  ngOnInit(): void {
    this.route.params.subscribe(routParams => {
      this.applicationService.getSingleApplication(routParams.id).subscribe(
        result => {
          this.interviewForm = false;
          this.application = result.data;
          this.isDataLoaded = true;
          this.checkRole();
          this.isCollapsed = false;
        },
        error => {
          console.log(error);

        })
    })
    this.checkRole();

  }

  deleteApplication() {
    this.applicationService.deleteSingleApplication(this.application.id).subscribe(
      result => {
        if (this.isAdmin) {
          this.location.back();
        } else {
          this.applicationService.appSubject.next("delete");
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  showForm() {
    this.interviewForm = !this.interviewForm;
  }

  checkRole() {
    this.userService.hasRole().subscribe(
      result => {
        if (result == 1) {
          this.isAdmin = true;
        } else if (result == 3) {
          this.isSeeker = true;
          this.showJob = true;
        }
      }
    );
  }

  subscribeInterviews() {
    this.interviewService.newInterviewSubject.subscribe(
      next => {
        this.ngOnInit();
      }
    )
  }

  showInterviews() {
    if (!this.isSeeker) {
      console.log("not seeker");
      
      this.router.navigate(['interviews'], { relativeTo: this.route });
    } else {
      this.isCollapsed = !this.isCollapsed;
      this.showJob = !this.showJob;
    }
  }
  

}
