import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../../../service/employee.service';
import { PasswordValidator } from '../../../../shared/password.validator';


@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css']
})
export class FormEmployeeComponent implements OnInit {
  error;
  employee_id;
  employee: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required],
    position: [''],
    branch: ['']
  }, { validators: PasswordValidator });

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

  get name() {
    return this.employee.get('name');
  }
  get email() {
    return this.employee.get('email');
  }
  get password() {
    return this.employee.get('password');
  }
  get password_confirmation() {
    return this.employee.get('password_confirmation');
  }

}
