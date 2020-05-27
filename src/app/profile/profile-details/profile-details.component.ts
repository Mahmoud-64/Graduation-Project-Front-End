import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeekerService } from '../../service/seeker.service';
import { Seeker } from '../../models/seeker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MobileModalComponent } from '../mobile-modal/mobile-modal.component';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  seeker: Seeker =
    {
      name: "",
      email: "",
      password: "",
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

  isCollapsed = true;
  isCollapsed2 = false;
  constructor(
    private seekerService: SeekerService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (this.router.url.includes('/profile/edit')) {
        this.isCollapsed = false;
        this.isCollapsed2 = true;
      }
      console.log("id==", +params.get('profileId'));

      this.getSeeker(+params.get('profileId'));
    });
  }

  getSeeker(seekerId): void {
    this.seekerService.getSeeker(seekerId)
      .subscribe(seeker => {
        console.log(seeker);
        this.seeker = seeker.data;
        this.contacts = seeker.data.contacts;
      });
  }

  changeData(data) {
    console.log("eventEmitter", data);
    this.isCollapsed = !this.isCollapsed;
    this.seeker.name = data.name;
    this.seeker.email = data.email;
  }

  changeDetailsData(data) {
    console.log("eventEmitter2", data);
    this.isCollapsed2 = !this.isCollapsed2;
    this.seeker = data;
  }

  openModal() {
    const modalRef = this.modalService.open(MobileModalComponent);
    modalRef.componentInstance.seeker_phone = this.seeker.phone;

  }

}
