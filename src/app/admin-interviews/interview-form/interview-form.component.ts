import { Component, OnInit, Input } from '@angular/core';
import { InterviewService } from '../services/interview.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'admin-interview-form',
  templateUrl: './interview-form.component.html',
  styleUrls: ['./interview-form.component.css']
})
export class InterviewFormComponent implements OnInit {

  constructor(
    private interviewService: InterviewService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  current;
  employees = [];
  levels = [];
  @Input() appId?;

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
    this.pushDate();
  }

  newInterviewForm = new FormGroup({
    application_id: new FormControl('',[
      Validators.required
    ]
    ),
    emp_id: new FormControl('',[
      Validators.required
    ]),
    level_id: new FormControl('',[
      Validators.required
    ]),
    date: new FormControl('',[
      Validators.required
    ]),
    zoom: new FormControl('',[
      Validators.required,
    ]),
  })

  onSubmit() {
    this.changeDateFormate()
    console.log(this.newInterviewForm.value);
    this.interviewService.addNewInterview(this.newInterviewForm.value).subscribe(
      result => {
        console.log(result);
        // this.router.navigateByUrl('/admin/applications/' + this.appId);
        this.interviewService.newInterviewSubject.next('new Interview');
      },
      error => {
        console.log(error);
      }
    )
  }

  pushDate(){
    let d = new Date().toISOString().slice(0, 16);
    this.newInterviewForm.patchValue({
      date: d,
      application_id:this.appId
    })
  }

  changeDateFormate(){
    let d = new Date(this.newInterviewForm.value.date);
    let newDate = d.toISOString().slice(0, 19).replace('T', ' ');
    console.log('new', newDate);
    this.newInterviewForm.patchValue({
      date: newDate,
    })
  }

  public get emp_id() {
    return this.newInterviewForm.get('emp_id');
  }
  public get level_id() {
    return this.newInterviewForm.get('level_id');
  }
  public get date() {
    return this.newInterviewForm.get('date');
  }
  public get zoom() {
    return this.newInterviewForm.get('zoom');
  }
}


