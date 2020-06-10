import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterviewService } from '../interview.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ApplicationService } from 'src/app/job-application/services/application.service';
import { LevelsService } from 'src/app/service/levels.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-interview-form',
  templateUrl: './interview-form.component.html',
  styleUrls: ['./interview-form.component.css'],
  providers: [InterviewService, ApplicationService, LevelsService, EmployeeService]
})
export class InterviewFormComponent implements OnInit {
  apps: any;
  levels: any;
  employees: any;
  error: any = {
    errors:
      [
        { 'application_id': null },
        { 'emp_id': null },
        { 'level_id': null },
        { 'date': null },
        { 'zoom': null },
      ]
  };

  constructor(private http: HttpClient, public interviewService: InterviewService, public applicationService: ApplicationService, public levelsService: LevelsService, public employeeService: EmployeeService, private router: Router, private _flashMessagesService: FlashMessagesService) { }
  onCreatePost(postData: { title: string; content: string }) {

    this.interviewService.addInterview(postData)
      .subscribe(responseData => {
        console.log(responseData);
        this._flashMessagesService.show('Record saved successfully', { cssClass: 'alert-success', timeout: 2000 });
        setTimeout(() => {
          this.router.navigate(["/admin/interviews"]);
        }, 2000);
      }, error => {
        this.error = error;
        this._flashMessagesService.show('error', { cssClass: 'alert-danger', timeout: 1000 });
      });
  }
  ngOnInit() {
    this.interviewService.fetchInterview();

    this.applicationService.getAllApplications()
      .subscribe(applications => {
        this.apps = applications;
        console.log(this.apps);
      });

    this.levelsService.getLevels()
      .subscribe(l => {
        this.levels = l;
        console.log(this.levels);
      });

    this.employeeService.getEmployees()
      .subscribe(emp => {
        this.employees = emp;
        console.log(this.employees);
      });


  }

}


