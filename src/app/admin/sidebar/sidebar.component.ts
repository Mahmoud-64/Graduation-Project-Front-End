import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ChildActivationEnd, NavigationEnd, ActivationStart } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute) {

  }
  selected = "";
  ngOnInit(): void {
    // on init only
    // this.route.firstChild.url.subscribe(
    //   url => {
    //     this.selected = url[0].path
    //   }
    // )
    //  after each change
    this.router.events.subscribe((val) => {
      if (val instanceof ActivationStart) {
        this.selected = val.snapshot.routeConfig.path;
      }
    });

  }

}
