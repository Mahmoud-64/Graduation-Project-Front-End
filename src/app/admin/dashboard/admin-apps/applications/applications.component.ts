import { Component, OnInit, Input } from '@angular/core';
import { ApplicationService } from 'src/app/job-application/services/application.service';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

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
  statuses = new FormArray([]);
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
        let res = result.data;
        let flag=0;
        for (const app in res)
        {
          let appId = res[app]["id"];
          this.addStatus(res[app]['status']);
          this.statuses.controls[app].valueChanges.subscribe(status => {
              if(flag==1)
              {
                this.applicationService.updateAppStatus(appId, status).subscribe(
                  result => {
                    console.log("updated==", result);
                  },
                  error => {
                    console.log(error);
                  })
              }
           })
          flag = 1;
        }
        if (flag==1)
        {
          this.applications = result.data;
        }
      },
      error => {
        console.log(error);
      }
    );
    this.applicationService.getAllStatus().subscribe(
      result => {
        this.allStatus = result.data;
      },
      error => {
        console.log(error);
      })


  }

  addStatus(status) {
      this.statuses.push(new FormControl(status['id']));
    }


  deleteApplication(appId, statusIndex) {
    this.applicationService.deleteSingleApplication(appId).subscribe(
      result => {
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
