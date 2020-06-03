import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

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
    "job": { "title": "", "description": "" },
    "status": { "name": "", "description": "" },
    "interviews":[],
  };
  isAdmin: boolean = false;
  interviewForm: boolean = false;
  isDataLoaded:boolean = false;

  constructor(
    private applicationService: ApplicationService,
    private userService:UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(routParams => {
      this.applicationService.getSingleApplication(routParams.id).subscribe(
        result => {
          console.log(result);
          this.interviewForm= false;
          this.application = result.data;
          this.isDataLoaded=true;
        },
        error => {
          console.log(error);

        }
      )
    })
    this.checkRole();
  }

  deleteApplication() {
    this.applicationService.deleteSingleApplication(this.application.id).subscribe(
      result => {
        console.log(result);
        this.applicationService.appSubject.next("delete");
      },
      error => {
        console.log(error);

      }
    )
  }

  showForm(){
    this.interviewForm = !this.interviewForm;
  }

  checkRole(){
    this.userService.hasRole().subscribe(
      result=>{
        if (result == 1) {
          this.isAdmin=true;
        }
        console.log('role', result);
      }
    );
    
    
  }

}
