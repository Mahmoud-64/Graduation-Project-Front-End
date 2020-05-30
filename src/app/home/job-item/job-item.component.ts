import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent implements OnInit {
  @Input() isClicked;
  @Input('jobData') job ;
  constructor() { }

  ngOnInit(): void {
  }

}
