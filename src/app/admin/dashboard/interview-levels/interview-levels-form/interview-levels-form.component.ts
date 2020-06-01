import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelsService } from '../../../../service/levels.service';
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
  error;
  level_id;
  level: FormGroup = this.fb.group({
    id: [''],
    name: [''],
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private levelsService: LevelsService,
    private fb: FormBuilder, ) { }

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.route.paramMap.subscribe(params => {
        this.level_id = +params.get('Id');
        console.log("level id", this.level_id);
      });
      this.levelsService.getLevel(this.level_id).subscribe(level => {
        this.level.patchValue(level['data']);
        console.log("level", level);
      })
    }
  }


  submitLevel() {
    console.log(this.level.value);
    if (this.router.url.includes('edit')) {
      this.levelsService.updateLevel(this.level_id, this.level.value)
        .subscribe(result => {
          console.log(result);
        },
        err=>{
          console.log("error",err.errors);
          this.error = err.errors;
        })
    } else {
      this.levelsService.addLevel(this.level.value)
        .subscribe(result => {
          console.log(result);
        },
        err=>{
          console.log("error",err.errors);
          this.error = err.errors;
        })
    }
  }

}
