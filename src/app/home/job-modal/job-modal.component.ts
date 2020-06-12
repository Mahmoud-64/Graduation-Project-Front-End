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
  userRole = 0;

  constructor(
    public activeModal:NgbActiveModal,
    private router: Router,
    private jobService: JobsService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.logged=this.userService.loggedIn();
    this.userRole = this.logged? this.userService.getUserRole() : 0;
    this.canApply = true;
    this.applyError = '';
  }

  applyJob() {
    if (this.logged) {
      this.jobService.applyJob(this.job.id).subscribe(
        result => {
          this.activeModal.close();
          this.router.navigateByUrl('/applications/' + result.data.id)
        },
        error => {
          this.applyError = error;
          this.canApply = false;
        }
      )
    } else {
      this.activeModal.close();
      this.router.navigateByUrl('/login');
    }

  }
}
