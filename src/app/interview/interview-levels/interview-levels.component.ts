import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InterviewService } from '../interview.service';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../job-application/services/application.service';


@Component({
  selector: 'app-interview-levels',
  templateUrl: './interview-levels.component.html',
  styleUrls: ['./interview-levels.component.css']
})
export class InterviewLevelsComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  @Input() interviews = [];
  loadInterview: boolean = false;
  newInterview;

  renderInterview: boolean = false;

  constructor(private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private interviewService: InterviewService,
  ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    
    if (!this.interviews.length) {
      this.route.params.subscribe(param => {
        this.route.params.subscribe(routParams => {
          this.applicationService.getSingleApplication(routParams.id).subscribe(
            result => {
              this.interviews = result.data['interviews'];
              this.renderFirstInterview();
              this.renderInterview = true;
            },
            error => {
              console.log(error);

            })
        })
      })
    } else {
      this.renderFirstInterview();
      this.renderInterview = true;
    }
  }

  showInterview(interview) {
    this.newInterview = this.interviews[interview.selectedIndex];
    this.loadInterview = !this.loadInterview;
  }
  renderFirstInterview() {
    if (this.interviews.length > 0) {
      this.newInterview = this.interviews[0];
    }
  }

}
