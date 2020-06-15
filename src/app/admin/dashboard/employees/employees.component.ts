import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../service/employee.service';
import { Employee } from '../../../models/employee';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private router: Router,
    private modalService: NgbModal
) { }


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
      this.employeeService.getEmployees({perPage: 11, page: page}).subscribe(users => {
        this.users = users.data;
        this.links = users.links;
      })
    }


    crudOperation(crudName, id) {
      switch (crudName) {
        case 'new':
          this.router.navigateByUrl(`/admin/employee/new`);
          break;
        case 'show':
          this.router.navigateByUrl(`/admin/employee/show/${id}`);
          break;
        case 'edit':
          this.router.navigateByUrl(`/admin/employee/edit/${id}`);
          break;
        case 'delete':
          this.employeeService.deleteEmployee(id).subscribe(result=>{
            this.error = result['data'];
            this.employeeService.getEmployees(this.page).subscribe(users => {
              this.users = users.data;
            })
          });

          break;
      }
    }
  confirmDelete(data) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.data = "the user " + data.name;
    modalRef.result.then(
      result => {
        this.crudOperation('delete',data.id);
      },
      rejected => {
      }
    )
  }

}
