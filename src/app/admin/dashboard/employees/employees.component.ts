import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../service/employee.service';
import { Employee } from '../../../models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  users: Array<Employee> = [{
    id: '',
    name: '',
    email: '',
    role: ''
  }];
  changed=true;

  constructor(
    private employeeService: EmployeeService,
    private router: Router) { }


    ngOnInit(): void {
      this.employeeService.getEmployees().subscribe(users => {
        this.users = users.data;
        console.log(this.users);
      })
    }
    crudOperation(crudName, id) {
      switch (crudName) {
        case 'show':
          console.log('show', id, this.router.url);
          this.router.navigateByUrl(`/profile/${id}`);
          break;
        case 'edit':
          console.log('edit');
          this.router.navigateByUrl(`/profile/edit/${id}`);
          break;
        case 'delete':
          console.log('delete');
          this.employeeService.deleteEmployee(id).subscribe(result=>{
            console.log(result);
            this.employeeService.getEmployees().subscribe(users => {
              this.users = users.data;
              console.log(this.users);
            })
          });

          break;
      }
    }

}
