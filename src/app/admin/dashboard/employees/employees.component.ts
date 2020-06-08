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
    user: [{
      id: '',
      name: '',
      email: '',
      role: ''
    }]
  }];
  changed=true;
  links = {
    prev: '',
    next: '',
  };
  page = 1;
  constructor(
    private employeeService: EmployeeService,
    private router: Router) {
      console.log('employee opened');

     }


    ngOnInit(): void {
      this.getEmployees(this.page);
    }

    next()
    {
      this.page++;
      this.getEmployees(this.page);
    }

    prev()
    {
      this.page--;
      this.getEmployees(this.page);
    }

    getEmployees(page)
    {
      this.employeeService.getEmployees({perPage: 15, page: page}).subscribe(users => {
        this.users = users.data;
        this.links = users.links;
        console.log(users);
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
