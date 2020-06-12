import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApplicationService } from '../../../../../job-application/services/application.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.css']
})
export class StatusFormComponent implements OnInit {

  statusesForm: FormGroup = this.fb.group({
    name: ['',
      [Validators.required,
      Validators.maxLength(15),
      Validators.minLength(3),]
    ],
    description: ['',
     [ Validators.required,
      Validators.maxLength(100),
      Validators.minLength(15)]
    ]
  });
  error;
  @Input() status_id;
  @Input() clickType;
  @Output() statusChanged = new EventEmitter;

  private _success = new Subject<string>();
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationService
  ) { }

  ngOnInit(): void {
    if (this.status_id) {
      this.applicationService.getStatus(this.status_id).subscribe(status => {
        this.statusesForm.patchValue(status['data'])
      })
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

  submitStatus() {
    if (this.status_id) {
      this.applicationService.updateStatus(this.status_id, this.statusesForm.value).subscribe(
        result => {
          this.changeSuccessMessage();
          this.statusChanged.emit();
        },
        error => {
          this.error = error.error
        })
    } else {
      this.applicationService.addNewStatus(this.statusesForm.value).subscribe(status => {
        this.changeSuccessMessage();
        this.statusChanged.emit();
      })
    }
  }

  get name() {
    return this.statusesForm.get('name');
  }
  get description() {
    return this.statusesForm.get('description');
  }

}
