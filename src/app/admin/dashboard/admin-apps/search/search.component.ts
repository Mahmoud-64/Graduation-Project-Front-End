import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../../../home/services/jobs.service';
import { ApplicationService } from '../../../../job-application/services/application.service';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup = this.fb.group({
    status: [''],
    position: [''],
    seniority: [''],
    expYears: [''],
    city: [''],
  });
  statuses=[];
  
  constructor(
    private jobsService: JobsService,
    private applicationService: ApplicationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.applicationService.getAllStatus().subscribe(statuses=>{
      this.statuses = statuses.data;
    })
  }

  onSubmit(){
    console.log(this.searchForm.value);
    
  }

}
