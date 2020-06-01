import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { EmployeeService } from '../../../../service/employee.service';


@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css']
})
export class FormEmployeeComponent implements OnInit {
  error;
  employee_id;
  employee: FormGroup = this.fb.group({
    name: [''],
    email: [''],
    password: [''],
    password_confirmation: [''],
    position: [''],
    branch: ['']
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.route.paramMap.subscribe(params => {
        this.employee_id = +params.get('id');
      });

      this.employeeService.getEmployee(this.employee_id).subscribe(employee => {
        this.employee.patchValue(employee['data']);
        console.log(this.employee.value);

      });
    }
  }


  submitEmployee() {
    if (this.router.url.includes('edit')) {
      this.employeeService.updateEmployee(this.employee_id, this.employee.value)
        .subscribe(result => {
          console.log(result);
        },
          err => {
            console.log("error", err.errors);
            this.error = err.errors;
          })
    } else {
      console.log(this.employee.value);
      this.employeeService.addEmployee(this.employee.value)
        .subscribe(result => {
          console.log(result);
        },
          err => {
            console.log("error", err.errors);
            this.error = err.errors;
          })
    }
  }


}
