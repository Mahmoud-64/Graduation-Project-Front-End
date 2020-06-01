import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ContactService } from '../../../../profile/contact/service/contact.service';

@Component({
  selector: 'app-contact-types-form',
  templateUrl: './contact-types-form.component.html',
  styleUrls: ['./contact-types-form.component.css']
})
export class ContactTypesFormComponent implements OnInit {
  error;
  contact_type_id;
  contactType: FormGroup = this.fb.group({
    id: [''],
    type: ['']
  });
  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService) { }

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.route.paramMap.subscribe(params => {
        this.contact_type_id = +params.get('Id');
      });

      this.contactService.getContactType(this.contact_type_id).subscribe(contactType => {
        this.contactType.patchValue(contactType['data']);
      });
    }
  }

  submitContactType() {
    console.log(this.contactType.value);
    if (this.router.url.includes('edit')) {
      this.contactService.editContactType(this.contact_type_id, this.contactType.value)
        .subscribe(result => {
          console.log(result);
        },
        err=>{
          console.log("error",err.errors);
          this.error = err.errors;
        })
    } else {
      this.contactService.addContactType(this.contactType.value)
        .subscribe(result => {
          console.log(result);
        },
        err=>{
          console.log("error",err.errors);
          this.error = err.errors;
        })
    }
  }

  get type() { return this.contactType.get('type'); }

}
