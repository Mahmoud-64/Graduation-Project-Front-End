import { Component, OnInit } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  job = {
    "id": "",
    "title": "",
    "description": "",
    "seniority": "",
    "years_exp":"",
    "requirements": ""
  };
  user = {};
  logged: Boolean;
  canApply: Boolean = true;
  applyError;
  constructor(
    private jobService: JobsService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.logged = this.userService.loggedIn();

    this.route.params.subscribe(routeParams => {
      this.jobService.getSingleJob(routeParams.id).subscribe(
        result => {
          console.log(result);
          this.job = result.data;
          this.canApply = true;
          this.applyError = '';
        },
        error => {
          console.log(error);
        }
      )
    });

  }
  applyJob() {
    console.log(this.job.id);
    if (this.logged) {
      this.jobService.applyJob(this.job.id).subscribe(
        result => {
          console.log(result);
          this.router.navigateByUrl('/applications/' + result.data.id)
        },
        error => {
          console.log(error);
          this.applyError = error;
          this.canApply = false;
        }
      )
      console.log("aftersend");
    } else {
      this.router.navigateByUrl('/login');
    }

  }
 

}
