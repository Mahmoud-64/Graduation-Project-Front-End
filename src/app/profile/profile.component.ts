import { Component, OnInit } from '@angular/core';
import { SeekerService } from '../service/seeker.service';
import { Seeker } from '../models/seeker';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  seekers: Seeker =
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
  constructor(private seekerService: SeekerService) { }

  ngOnInit(): void
  {
    this.getSeekers();
  }

  getSeekers(): void
  {
      this.seekerService.getSeekers()
      .subscribe(seekers => this.seekers = seekers.data);
  }

}
