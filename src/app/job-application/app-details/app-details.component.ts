import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.css']
})
export class AppDetailsComponent implements OnInit {

  application;
  constructor(
    private applicationService: ApplicationService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(routParams =>{
      this.applicationService.getSingleApplication(routParams.id).subscribe(
        result => {
          console.log(result);
          this.application = result.data;
        },
        error => {
          console.log(error);

        }
      )
    })
    
  }

}
