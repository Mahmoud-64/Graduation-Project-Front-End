
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeekerService } from '../../service/seeker.service';
import { UserService } from '../../service/user.service';
import { Seeker } from '../../models/seeker';
import { MobileModalComponent } from '../mobile-modal/mobile-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from '../image-modal/image-modal.component';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})

export class ProfileDetailsComponent implements OnInit {
  seeker: Seeker =
    {
      user: {
        name: "",
        email: "",
        password: "",
      },
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
      isVerified: 0
    };
  profileImage= "https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png"
  contacts: [];
  role;
  isCollapsed = true;
  isCollapsed2 = false;
  constructor(
    private seekerService: SeekerService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.role = this.userService.getUserRole();
    this.route.paramMap.subscribe(params => {
      this.getSeeker(+params.get('profileId'));
    });
    // this.seekerService.getNotification().subscribe(result=>{
    //   console.log("result", result);
      
    // })
  }

  getSeeker(seekerId): void {
    this.seekerService.getSeeker(seekerId)
      .subscribe(seeker => {
        this.seeker = seeker.data;
        this.contacts = seeker.data.contacts;
        seeker.data.user.image ? this.profileImage = seeker.data.user.image : null;
      });
  }

  changeData(data) {
    this.isCollapsed = !this.isCollapsed;
    this.seeker.user.name = data.data.name;
    this.seeker.user.email = data.data.email;
  }

  changeDetailsData(data) {
    this.seeker = data;
    this.contacts = data.contacts;
  }

  downloadFile() {
    this.seekerService.downloadCV(this.seeker.user.id, this.seeker.cv).subscribe(res => {
    })
  }

  openModal() {
    const modalRef = this.modalService.open(MobileModalComponent);
    modalRef.componentInstance.seeker_phone = this.seeker.phone;
  }

  updatePhoto(){
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
