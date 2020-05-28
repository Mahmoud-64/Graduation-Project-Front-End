import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators, FormGroup, NgControl, FormArray, FormBuilder } from '@angular/forms';
import { JobsService } from '../services/jobs.service';

@Component({
  selector: 'new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css']
})
export class NewJobComponent implements OnInit {
  // job = {
  //   "title": "",
  //   "description": "",
  //   "seniority": "",
  //   "years_exp": "",
  //   "requirements": []
  // }
  jobServerError = "";
  constructor(
    private fB: FormBuilder,
    private jobService: JobsService
  ) { }

  ngOnInit(): void {
  }

  newJobForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(5),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(150),
      Validators.minLength(10),
    ]),
    seniority: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(5),
    ]),
    years_exp: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(25),
    ]),
    available: new FormControl('', [

    ]),
    requirements: this.fB.array([])
  })

  newRequire() {
    return this.fB.control('',
      Validators.required,
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
    this.jobService.addNewJob(this.newJobForm.value).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
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


}
