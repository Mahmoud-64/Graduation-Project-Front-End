
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Seeker } from '../models/seeker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MobileModalComponent } from './mobile-modal/mobile-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  seeker: Seeker =
    {
      name: "",
      email: "",
      password: "",
      phone: "",
      contact: "",
      address: "",
      city: "",
      seniority: "",
      expYears: 0,
      currentJob: "",
      currentSalary: 0,
      expectedSalary: 0,
      cv: "",
      isVerified:0
    };
  contacts: [];
  url = '';
  role;
  isCollapsed = true;
  isCollapsed2 = false;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.userService.getOneUser(params.profileId).subscribe((data)=>{
        this.role = data["data"]["role"];
      })

    })
  }


}
