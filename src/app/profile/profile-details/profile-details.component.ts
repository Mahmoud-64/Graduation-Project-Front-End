
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
      this.getSeeker(+params.get('profileId'));
    });
  }

  getSeeker(seekerId): void {
    this.seekerService.getSeeker(seekerId)
      .subscribe(seeker => {
        this.seeker = seeker.data;
        this.contacts = seeker.data.contacts;
        this.role = seeker.data.role;
        console.log("roooooole", this.role);

        this.url = `/api/seekers/downloadcv/${this.seeker.id}/${this.seeker.cv}`;
      });
  }

  changeData(data) {
    if (!this.router.url.includes('/profile/edit')) {
      this.isCollapsed = !this.isCollapsed;
    }
    this.seeker.name = data.data.name;
    this.seeker.email = data.data.email;
  }

  changeDetailsData(data) {
    if (!this.router.url.includes('/profile/edit')) {
      this.isCollapsed2 = !this.isCollapsed2;
    }
    this.seeker = data;
  }

  downloadFile(){
    console.log(this.seeker);

    this.seekerService.downloadCV(this.seeker.id, this.seeker.cv).subscribe(res=>{
      console.log(res);
    })
  }

  openModal() {
    const modalRef = this.modalService.open(MobileModalComponent);
    modalRef.componentInstance.seeker_phone = this.seeker.phone;
  }

}
