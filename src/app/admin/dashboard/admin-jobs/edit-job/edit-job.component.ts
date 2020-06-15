import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { JobsService } from 'src/app/home/services/jobs.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'admin-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {

  job = {
    "id": "",
    "title": "",
    "description": "",
    "seniority": "",
    "years_exp": "",
    'available': "",
    "requirements": []
  }
  header="New Job"

  isDataLoaded: boolean = false;
  jobServerError = {
    message: "",
    errors: {
      "title": [],
      "description": [],
      "seniority": [],
      "years_exp": [],
    }
  };
  constructor(
    private fB: FormBuilder,
    private jobService: JobsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      if (routeParams.id) {
        this.jobService.getSingleJob(routeParams.id).subscribe(
          result => {
            this.job = result.data;
            this.isDataLoaded = true;
            this.header="Update Job"
            this.setRequires();
            this.pushData();
          },
          error => {
          }
        )
      }
    });

  }

  newJobForm = new FormGroup({
    title: new FormControl(this.job.title, [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(5),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    seniority: new FormControl('', [
      Validators.required,
      Validators.maxLength(25),
      Validators.minLength(4),
    ]),
    years_exp: new FormControl('', [
      Validators.required,
      Validators.min(0),
    ]),
    available: new FormControl('', [

    ]),
    requirements: this.fB.array([

    ])
  })
  setRequires() {
    let controls = <FormArray>this.newJobForm.controls.requirements;
    for (const require of this.job.requirements) {
      controls.push(this.fB.control(require.name, [
        Validators.required
      ]))
    }

  }
  newRequire() {
    return this.fB.control('',
      [
        Validators.required
      ]
    );
  }

  addRequire() {
    this.requirements().push(this.newRequire());
  }
  removeRequire(i: number) {
    this.requirements().removeAt(i);
  }

  onSubmit() {
    console.log(this.newJobForm.value);
    
    this.jobServerError = {
      message: "",
      errors: {
        "title": [],
        "description": [],
        "seniority": [],
        "years_exp": [],
      }
    };
    if (this.isDataLoaded) {
      this.updateJob();
    } else {
      this.storeJob();
    }

  }
  updateJob(){
    this.jobService.updateJob(this.newJobForm.value, this.job.id).subscribe(
      result => {
        this.router.navigate(['/admin/jobs']);
      },
      error => {
        this.jobServerError = error;
      }
    )
  }

  storeJob(){
    this.jobService.addNewJob(this.newJobForm.value).subscribe(
      result => {
        this.router.navigate(['/admin/jobs']);
      },
      error => {
        this.jobServerError = error;
      }
    )
  }



  public get title() {
    return this.newJobForm.get('title');
  }
  public get description() {
    return this.newJobForm.get('description');
  }
  public get seniority() {
    return this.newJobForm.get('seniority');
  }
  public get years_exp() {
    return this.newJobForm.get('years_exp');
  }
  public get available() {
    return this.newJobForm.get('available');
  }

  requirements(): FormArray {
    return this.newJobForm.get('requirements') as FormArray;
  }

  pushData() {
    this.newJobForm.patchValue({
      title: this.job.title,
      description: this.job.description,
      seniority: this.job.seniority,
      years_exp: this.job.years_exp,
      available: this.job.available,
    })
  }
}
