import { Component, OnInit, Input } from '@angular/core';
import { ApplicationService } from 'src/app/job-application/services/application.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'admin-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  applications = [];
  allStatus = [];
  filterParams = {
    jobId: "",
  }
  @Input() job;
  constructor(
    private applicationService: ApplicationService,
  ) { }

  ngOnInit(): void {
    if (this.job) {
      this.filterParams.jobId = this.job;
    }

    this.applicationService.getFilterApplications(this.filterParams).subscribe(
      result => {
        this.applications = result.data;
        console.log(this.applications);
        
      },
      error => {
        console.log(error);

      }
    );
    this.applicationService.getAllStatus().subscribe(
      result => {
        this.allStatus = result.data;
        console.log(result);
      },
      error => {
        console.log(error);

      }
    )
  }


  newStatus = new FormControl('');
  submitStatus(appId) {
    console.log('submited', this.newStatus.value);
    this.applicationService.updateAppStatus(appId, this.newStatus.value).subscribe(
      result => {
        console.log(result);
        this.ngOnInit();
      },
      error => {
        console.log(error);

      }
    )
  }


  deleteApplication(appId) {
    this.applicationService.deleteSingleApplication(appId).subscribe(
      result => {
        console.log(result);
        this.ngOnInit();
      },
      error => {
        console.log(error);
      });
  }


  updateAppTable(event){
    this.applications = event;
  }

}
