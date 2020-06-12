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
  profileImage = "https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png"

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
      user.data.user.image ? this.profileImage = user.data.user.image : null;

    });
  }

}
