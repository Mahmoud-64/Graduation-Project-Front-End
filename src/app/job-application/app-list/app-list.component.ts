import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {

  applications = [];
  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.applicationService.getAllApplications().subscribe(
      result => {
        console.log("success");
        console.log(result.data);
        this.applications = result.data;
      },
      error => {
        console.log("error");
        console.log(error);
      }
    );
    this.applicationService.appSubject.subscribe(
      next=>{
        console.log(next);
        this.ngOnInit();
      },
      error=>{
        console.log(error);
      },
      () =>{
        console.log("done");
      }
      
    )
  }


}
