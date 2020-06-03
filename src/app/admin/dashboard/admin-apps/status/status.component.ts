import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/job-application/services/application.service';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  statuses = [];
  hideForm: Array<boolean>;
  statusesForm = new FormArray([]);
  addNewStatus:boolean=false;
  error=null;
  constructor(
    private applicationService: ApplicationService
  ) { }

  ngOnInit(): void {
    this.applicationService.getAllStatus().subscribe(
      result => {
        console.log('statuses', result.data);
        this.statuses = result.data;
        this.hideForm = Array(result.data.length)
        this.hideForm.fill(true);
        this.error=null;
        this.addStatusForms();
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteStatus(status) {
    this.applicationService.deleteStatus(status).subscribe(
      result=>{
        console.log(result);
        this.ngOnInit();
      },
      error=>{
        console.log(error);
        this.error=error.error  
       
      }
    )
    
  }
  editStatus(status) {
    if (this.hideForm[status]==false) {
      this.hideForm[status] = true;
    }
    else{
      this.hideForm.fill(true);
      this.hideForm[status] = !this.hideForm[status];
    }
    
  }

  addStatusForms() {
    this.statusesForm.clear();
    this.hideForm.forEach((i, index) => {
      this.statusesForm.push(
        new FormGroup({
          name: new FormControl(this.statuses[index].name,[
            Validators.required,
            Validators.maxLength(15),
            Validators.minLength(3),
          ]),
          description: new FormControl(this.statuses[index].description,[
            Validators.required,
            Validators.maxLength(100),
            Validators.minLength(15),
          ])
        })
      )
    });
  }

  updateStatus(i, status) {
    console.log(this.statusesForm.controls[i].value)
    this.applicationService.updateStatus(status, this.statusesForm.controls[i].value).subscribe(
      result => {
        console.log(result);
        this.ngOnInit()
      },
      error => {
        console.log(error);
        this.error = error.error
      }
    )
  }

  newStatusForm=new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(3),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
      Validators.minLength(15),
    ])
  })
  showNewStatusForm(){
    this.addNewStatus = !this.addNewStatus
  }

  submitNewStatus(){
    console.log('newstatus',this.newStatusForm.value);
    this.applicationService.addNewStatus(this.newStatusForm.value).subscribe(
      result=>{
        console.log(result);
        this.ngOnInit();
        this.addNewStatus=false;
      },
      error=>{
        console.log(error);
        this.error="sorry name and description must be unique";
        
        
      }
    )
     
  }
  

}
