import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './app-item.component.html',
  styleUrls: ['./app-item.component.css']
})
export class AppItemComponent implements OnInit {
  @Input('applicationData') application ;
  constructor() { }

  ngOnInit(): void {
  }

}
