import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  image;

  constructor(
  private route: ActivatedRoute,
  private router: Router
  ) {
    this.image = router;
   }
  ngOnInit(): void {
  }

}
