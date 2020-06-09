import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelsService } from '../../../../service/levels.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-interview-levels-form',
  templateUrl: './interview-levels-form.component.html',
  styleUrls: ['./interview-levels-form.component.css']
})
export class InterviewLevelsFormComponent implements OnInit {
  @Input() level_id;
  @Input() clickType;
  @Output() levelChanged = new EventEmitter;
  error;
  level: FormGroup = this.fb.group({
    id: [''],
    name: [''],
  });
  private _success = new Subject<string>();
  successMessage = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private levelsService: LevelsService,
    private fb: FormBuilder, ) { }

  ngOnInit(): void {
    if (this.level_id) {
      this.levelsService.getLevel(this.level_id).subscribe(level => {
        this.level.patchValue(level['data']);
        console.log("level", level);
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

  submitLevel() {
    console.log(this.level.value);
    if (this.clickType == 'edit') {
      this.levelsService.updateLevel(this.level_id, this.level.value)
        .subscribe(result => {
          this.error = '';
          this.levelChanged.emit();
          this.changeSuccessMessage();
        },
          err => {
            this.error = err.errors;
          })
    } else {
      this.levelsService.addLevel(this.level.value)
        .subscribe(result => {
          this.error = '';
          this.levelChanged.emit();
          this.changeSuccessMessage();
        },
          err => {
            this.error = err.errors;
          })
    }
  }

}
