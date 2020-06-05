import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JobsService } from '../services/jobs.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-job-modal',
  templateUrl: './job-modal.component.html',
  styleUrls: ['./job-modal.component.css']
})
export class JobModalComponent implements OnInit {

  @Input() job;
  logged: Boolean;
  canApply: Boolean = true;
  applyError;

  constructor(
    public activeModal:NgbActiveModal,
    private router: Router,
    private jobService: JobsService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.logged=this.userService.loggedIn()
    this.canApply = true;
    this.applyError = '';
  }

  applyJob() {
    console.log(this.job.id);
    if (this.logged) {
      this.jobService.applyJob(this.job.id).subscribe(
        result => {
          console.log(result);
          this.activeModal.close();
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
      this.activeModal.close();
      this.router.navigateByUrl('/login');
    }

  }
}
