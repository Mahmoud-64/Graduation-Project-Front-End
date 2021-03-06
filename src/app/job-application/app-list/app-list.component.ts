import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {

  applications = [];
  firstElementId ;
  constructor(
    private applicationService: ApplicationService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.applicationService.getAllApplications().subscribe(
      result => {
        this.applications = result.data;
        if (result.data.length > 0) {
          this.renderFirstApp(result.data);
        }
        else{
          this.router.navigateByUrl('/applications')
        }
      },
      error => {
      }
    );
    this.applicationService.appSubject.subscribe(
      next=>{
        this.ngOnInit();
      },
      error=>{
      },
      () =>{
      }
      
      
    )
  }
  renderFirstApp(apps) {
    this.firstElementId = apps[0].id;
    this.router.navigateByUrl('/applications/' + this.firstElementId);
  }


}
