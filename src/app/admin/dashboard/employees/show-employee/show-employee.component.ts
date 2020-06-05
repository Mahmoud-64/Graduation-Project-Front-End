import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../service/employee.service';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit {
  user={
    user: {
      id: "",
      name: "",
      email: "",
    },
    position: "",
    branch: "",
  };

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.getEmployee(params.get('id'));
    });
  }

  getEmployee(user_id)
  {
    this.employeeService.getEmployee(user_id).subscribe(user => {
      this.user = user.data;
      console.log("show user", this.user);
    });
  }

}
