import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeekerService } from '../../../../service/seeker.service';

@Component({
  selector: 'app-show-seeker',
  templateUrl: './show-seeker.component.html',
  styleUrls: ['./show-seeker.component.css']
})
export class ShowSeekerComponent implements OnInit {
  seeker = {
    user: {
      id: "",
      name: "",
      email: "",
      password: "",
      verify_email: ""
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
    contacts: [],
    isVerified: 0,
  };
  url;
  profileImage = "https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png"

  constructor(
    private seekerService: SeekerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.getSeeker(params.get('id'));
    });
  }

  getSeeker(user_id) {
    this.seekerService.getSeeker(user_id).subscribe(user => {
      this.seeker = user.data;
      user.data.user.image ? this.profileImage = user.data.user.image : null;
      this.url = `/api/seekers/downloadcv/${this.seeker.user.id}/${this.seeker.cv}`;
    });
  }

}
