import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ContactService } from '../../../../profile/contact/service/contact.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-contact-types-form',
  templateUrl: './contact-types-form.component.html',
  styleUrls: ['./contact-types-form.component.css']
})
export class ContactTypesFormComponent implements OnInit {
  error;
  contactType: FormGroup = this.fb.group({
    id: [''],
    type: ['']
  });

  @Input() contact_type_id;
  @Input() clickType;
  @Output() contactTypeChanged = new EventEmitter;

  private _success = new Subject<string>();
  successMessage = '';

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService) { }

  ngOnInit(): void {
    if (this.contact_type_id) {
      this.contactService.getContactType(this.contact_type_id).subscribe(contactType => {
        this.contactType.patchValue(contactType['data']);
      });
    }
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = '');
  }


  public changeSuccessMessage() {
    if (this.clickType == 'edit') {
      this._success.next(`Edited successfully.`);
    } else {
      this._success.next(`Added successfully.`);
    }
  }

  submitContactType() {
    console.log(this.contactType.value);
    if (this.contact_type_id) {
      this.contactService.editContactType(this.contact_type_id, this.contactType.value)
        .subscribe(result => {
          console.log(result);
          this.contactTypeChanged.emit();
          this.changeSuccessMessage();
        },
          err => {
            console.log("error", err.errors);
            this.error = err.errors;
          })
    } else {
      this.contactService.addContactType(this.contactType.value)
        .subscribe(result => {
          console.log(result);
          this.contactTypeChanged.emit();
          this.changeSuccessMessage();
        },
          err => {
            console.log("error", err.errors);
            this.error = err.errors;
          })
    }
  }

  get type() { return this.contactType.get('type'); }

}
