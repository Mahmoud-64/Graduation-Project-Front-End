import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @Input() contacts: any;
  constructor() { }

  ngOnInit(): void {
  }

}
