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
  constructor(
    private fB: FormBuilder,
    private jobService: JobsService
  ) { }

  ngOnInit(): void {
  }

  newJobForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl('', [
      Validators.required,
    ]),
    seniority: new FormControl('', [
      Validators.required,
    ]),
    years_exp: new FormControl('', [
      Validators.required,
    ]),
    requirements: this.fB.array([])
  })

  newRequire() {
    return this.fB.control('');
  }


  addRequire() {
    console.log("addRequire");
    this.requirements().push(this.newRequire());
  }
  removeRequire(i: number) {
    this.requirements().removeAt(i);
  }

  onSubmit() {
    console.log("submit");
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

  requirements(): FormArray {
    return this.newJobForm.get('requirements') as FormArray;
  }


}
