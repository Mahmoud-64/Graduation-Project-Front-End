import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("xxxx");
    
  }

  onClick(data)
  {
    this.router.navigate([data], {relativeTo: this.route});
  }

}
