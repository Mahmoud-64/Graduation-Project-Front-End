import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from '../../models/employee';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from '../image-modal/image-modal.component';

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
  profileImage = "https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png"
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private modalService: NgbModal
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
        employee.data.user.image ? this.profileImage = employee.data.user.image : null;
      });
  }

  updatePhoto() {
    const modalRef = this.modalService.open(ImageModalComponent);
    modalRef.componentInstance.photo = this.profileImage;
    modalRef.result.then(
      result => {
        this.ngOnInit();
      },
      rejected => {
      }
    )
  }


}
