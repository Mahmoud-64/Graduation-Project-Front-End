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

  interviews = [];
  loadInterview: boolean = false;
  newInterview;

  renderInterview: boolean = false;

  constructor(private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

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

          }
        )
      })
    })
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

  // myInterviews() {
  //   this.renderInterview = !this.renderInterview;
  // }
}
