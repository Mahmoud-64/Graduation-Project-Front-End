import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ContactService } from '../../../../profile/contact/service/contact.service';
import { SeekerService } from '../../../../service/seeker.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  error;
  // contact_id;
  @Input() contact_id;
  @Input() clickType;
  @Output() contactChanged = new EventEmitter;
  contactTypes: Array<any> = [];
  seekers: Array<any> = [];
  contact: FormGroup = this.fb.group({
    id: [''],
    seeker_id: [''],
    seeker_name: [''],
    data: [''],
    contact_types_id: [''],
    contact_type: ['']
  });
  private _success = new Subject<string>();
  successMessage = '';


  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private seekerService: SeekerService) { }

  ngOnInit(): void {
    if (this.contact_id) {
      // this.route.paramMap.subscribe(params => {
      //   this.contact_id = +params.get('Id');
      // });

      this.contactService.getContact(this.contact_id).subscribe(contact => {
        this.contact.patchValue(contact);
      });
      this._success.subscribe(message => this.successMessage = message);
      this._success.pipe(
        debounceTime(3000)
      ).subscribe(() => this.successMessage = '');
    }
    this.contactService.getContactTypes().subscribe(contact => {
      this.contactTypes = contact['data'];
    });
    this.seekerService.getSeekers().subscribe(seeker => {
      this.seekers = seeker['data'];
    });
  }

  public changeSuccessMessage() {
    if (this.clickType == 'edit') {
      this._success.next(`Edited successfully.`);
    } else {
      this._success.next(`Added successfully.`);
    }
  }


  submitContact() {
    if (this.contact_id) {
      this.contactService.editContact(this.contact_id, this.contact.value)
        .subscribe(result => {
          this.contactChanged.emit();
          this.changeSuccessMessage();
        })
    } else {
      this.contactService.addNewContact(this.contact.value)
        .subscribe(result => {
          this.contactChanged.emit();
          this.changeSuccessMessage();
        },
        err=>{
          this.error = err.errors;
        })
    }
  }

}
