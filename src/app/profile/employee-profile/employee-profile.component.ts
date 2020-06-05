import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from '../../models/employee';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  employee: Employee =
    {
      user: {
        name: "",
        email: "",
        password: "",
      },
      position: "",
      branch: "",
    };
  role;
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.getEmployee(+params.get('profileId'));
    });
  }

  getEmployee(employeeId): void {
    this.employeeService.getEmployee(employeeId)
      .subscribe(employee => {
        this.employee = employee.data;
      });
  }


}
