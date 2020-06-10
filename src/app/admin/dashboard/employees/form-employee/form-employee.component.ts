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
    user: this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    }, { validators: PasswordValidator }),
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
      });
    }
  }


  submitEmployee() {
    let employeeData = {
      name: this.employee.value.user.name,
      email: this.employee.value.user.email,
      password: this.employee.value.user.password,
      password_confirmation: this.employee.value.user.password_confirmation,
      position: this.employee.value.position,
      branch: this.employee.value.branch,
    };
    if (this.router.url.includes('edit')) {
      this.employeeService.updateEmployee(this.employee_id, employeeData)
        .subscribe(result => {
        this.error = '';
          this.router.navigateByUrl(`/admin/employee/show/${this.employee_id}`);
        },
          err => {
            this.error = err.errors;
          })
    } else {
      this.employeeService.addEmployee(employeeData)
        .subscribe(result => {
        this.error = '';
        this.router.navigateByUrl(`/admin/employee/show/${result.data.user.id}`);
        },
          err => {
            this.error = err.errors;
          })
    }
  }

  get name() {
    return this.employee.get('user').get('name');
  }
  get email() {
    return this.employee.get('user').get('email');
  }
  get password() {
    return this.employee.get('user').get('password');
  }
  get password_confirmation() {
    return this.employee.get('user').get('password_confirmation');
  }

}
