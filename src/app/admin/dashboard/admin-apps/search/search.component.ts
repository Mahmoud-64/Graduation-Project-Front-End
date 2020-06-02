import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() appEvent: EventEmitter<any> = new EventEmitter<any>();
  searchForm: FormGroup = this.fb.group({
    status: [''],
    position: [''],
    seniority: [''],
    expYears: [''],
    city: [''],
    exporder: [''],
  });
  statuses=[];
  applications=[];

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
    this.applicationService.getAllApplications(this.searchForm.value).subscribe(applications=>{
      this.applications = applications['data'];
      console.log("searched applications",applications);
      this.appEvent.emit(this.applications);
    })
  }

}
