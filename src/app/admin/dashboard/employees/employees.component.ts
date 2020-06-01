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
  error;
  users: Array<Employee> = [{
    id: '',
    name: '',
    email: '',
    role: ''
  }];
  changed=true;

  constructor(
    private employeeService: EmployeeService,
    private router: Router) {
      console.log('employee opened');

     }


    ngOnInit(): void {
      this.employeeService.getEmployees().subscribe(users => {
        this.users = users.data;
        console.log(this.users);
      })
    }
    crudOperation(crudName, id) {
      switch (crudName) {
        case 'new':
          console.log('new', id, this.router.url);
          this.router.navigateByUrl(`/admin/employee/new`);
          break;
        case 'show':
          console.log('show', id, this.router.url);
          this.router.navigateByUrl(`/admin/employee/show/${id}`);
          break;
        case 'edit':
          console.log('edit');
          this.router.navigateByUrl(`/admin/employee/edit/${id}`);
          break;
        case 'delete':
          console.log('delete');
          this.employeeService.deleteEmployee(id).subscribe(result=>{
            console.log(result);
            this.error = result['data'];
            this.employeeService.getEmployees().subscribe(users => {
              this.users = users.data;
              console.log(this.users);
            })
          });

          break;
      }
    }

}
