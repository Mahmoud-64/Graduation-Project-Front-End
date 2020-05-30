import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/job-application/services/application.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  applications = [];
  allStatus = [];
  constructor(
    private applicationService: ApplicationService,
  ) { }

  ngOnInit(): void {
    this.applicationService.getAllApplications().subscribe(
      result => {
        this.applications = result.data;
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
    this.applicationService.updateAppStatus(appId,this.newStatus.value).subscribe(
      result=>{
        console.log(result);
        this.ngOnInit();
      },
      error=>{
        console.log(error);
        
      }
    )
  }

  showApplication(appId) {

  }

  test() {
    console.log('touch');

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


}
