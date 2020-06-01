import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeekerService } from '../../../../service/seeker.service';

@Component({
  selector: 'app-show-seeker',
  templateUrl: './show-seeker.component.html',
  styleUrls: ['./show-seeker.component.css']
})
export class ShowSeekerComponent implements OnInit {
  user={
    id: "",
    name: "",
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
    contacts: [],
    isVerified:0,
    emailVerified: ""
  };
  url;

  constructor(
    private seekerService: SeekerService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.getSeeker(params.get('id'));
    });
  }

  getSeeker(user_id)
  {
    this.seekerService.getSeeker(user_id).subscribe(user => {
      this.user = user.data;
      this.url = `/api/seekers/downloadcv/${this.user.id}/${this.user.cv}`;
      console.log("show user", this.user);
    });
  }

}
