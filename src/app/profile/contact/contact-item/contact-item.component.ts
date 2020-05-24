import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {

  @Input() contact={
    data: '',
    contact_type: ''
  };
  constructor() { }

  ngOnInit(): void {
  }

}
