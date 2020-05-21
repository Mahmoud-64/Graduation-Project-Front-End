import { Component, OnInit } from '@angular/core';
import { SeekerService } from '../seeker.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  seekers;
  constructor(private seekerService: SeekerService) { }

  ngOnInit(): void
  {
    this.getSeekers();
  }

  getSeekers(): void
  {
      this.seekerService.getSeekers() 
      .subscribe(seekers => this.seekers = seekers);
  }

}
