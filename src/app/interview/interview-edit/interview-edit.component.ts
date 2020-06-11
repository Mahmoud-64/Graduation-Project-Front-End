import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterviewService } from '../interview.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ApplicationService } from 'src/app/job-application/services/application.service';
import { LevelsService } from 'src/app/service/levels.service';
import { EmployeeService } from 'src/app/service/employee.service';


@Component({
  selector: 'app-interview-edit',
  templateUrl: './interview-edit.component.html',
  styleUrls: ['./interview-edit.component.css'],
  providers: [InterviewService, ApplicationService, LevelsService, EmployeeService]
})
export class InterviewEditComponent implements OnInit {
  apps: any = { data: [] };
  levels: any = { data: [] };
  employees: any = { data: [] };
  single: any = {};
  id = 0;
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


  constructor(
    private http: HttpClient,
    public interviewService: InterviewService,
    public applicationService: ApplicationService,
    public levelsService: LevelsService,
    public employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private _flashMessagesServicee: FlashMessagesService
  ) { }
  onCreatePost(postData: { title: string; content: string }) {
    this.interviewService.updateInterview(this.id, postData)
      .subscribe(
        responseData => {
          this._flashMessagesServicee.show('Record saved successfully', { cssClass: 'alert-success', timeout: 2000 });
          setTimeout(() => {
            this.router.navigate(["/admin/interviews"]);
          }, 2000);
        }, error => {
          this.error = error;
          this._flashMessagesServicee.show('error', { cssClass: 'alert-danger', timeout: 1000 });
        }
      );
  }
  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.interviewService.fetchSingleInterview(this.id).subscribe(interview => {
          this.single = interview['data']
        })
      });


    this.interviewService.fetchInterview();
    this.applicationService.getAllApplications()
      .subscribe(applications => {
        this.apps = applications;
      });

    this.levelsService.getLevels()
      .subscribe(l => {
        this.levels = l;
      });

    this.employeeService.getEmployees()
      .subscribe(emp => {
        this.employees = emp;
      });
  }
}
