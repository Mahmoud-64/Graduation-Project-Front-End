import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeekerService } from '../../service/seeker.service';
import { Seeker } from '../../models/seeker';

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
      cv: ""
    };

  constructor(private seekerService: SeekerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.getSeeker(+params.get('profileId'));
    });
  }

  getSeeker(seekerId): void
  {
      this.seekerService.getSeeker(seekerId)
      .subscribe(seeker => this.seeker = seeker.data);

  }

}
