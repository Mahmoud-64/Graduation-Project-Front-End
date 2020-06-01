import { Component, OnInit, Input } from '@angular/core';
import { InterviewService } from '../services/interview.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'admin-interview-form',
  templateUrl: './interview-form.component.html',
  styleUrls: ['./interview-form.component.css']
})
export class InterviewFormComponent implements OnInit {

  constructor(
    private interviewService: InterviewService,
    private employeeService: EmployeeService,
  ) {}
  current;
  employees = [];
  levels = [];
  @Input() appId;

  ngOnInit(): void {
    this.current = new Date();
    console.log(this.current);
    this.employeeService.getEmployees().subscribe(
      result => {
        console.log('employees', result);
        this.employees = result.data
      },
      error => {
        console.log(error);

      }
    );
    this.interviewService.getAllLevels().subscribe(
      result => {
        console.log('levels', result);
        this.levels = result.data;
      },
      error => {
        console.log(error);
      }
    )
  }

  newInterviewForm = new FormGroup({
    application_id: new FormControl(''),
    employee_id: new FormControl(''),
    level_id: new FormControl(''),
    date: new FormControl(),
    zoom: new FormControl(),
  })

  onSubmit() {
    console.log(this.newInterviewForm.value);
    this.interviewService.addNewInterview(this.newInterviewForm.value).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }
}


