import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SeekerService } from 'src/app/service/seeker.service';

@Component({
  selector: 'mobile-modal',
  templateUrl: './mobile-modal.component.html',
  styleUrls: ['./mobile-modal.component.css']
})
export class MobileModalComponent implements OnInit {

  data = {
    'phone': "",
    'verifyToken': ""
  }
  verifyError = "";
  
  constructor(
    public activeModal: NgbActiveModal,
    private seekerService: SeekerService
  ) { }

  @Input() seeker_phone;

  ngOnInit(): void {
  }

  VerifyPhoneForm = new FormGroup({
    code: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  })

  onSubmit() {
    this.data.phone = this.seeker_phone;
    this.data.verifyToken = this.VerifyPhoneForm.value.code;
    this.seekerService.verifyPhone(this.data).subscribe(
      result => {
        this.activeModal.close(true);
      },
      error => {
        this.verifyError = error.error;
      }
    )
  }

  public get code() {
    return this.VerifyPhoneForm.get('code');
  }

}
