import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelsService } from '../../../../service/levels.service';

@Component({
  selector: 'app-interview-levels-item',
  templateUrl: './interview-levels-item.component.html',
  styleUrls: ['./interview-levels-item.component.css']
})
export class InterviewLevelsItemComponent implements OnInit {
  level_id;
  level;
  constructor(private route: ActivatedRoute,
    private levelsService: LevelsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.level_id = +params.get('Id');
      console.log("level id",this.level_id);
    });
    this.levelsService.getLevel(this.level_id).subscribe(level => {
      this.level = level['data'];
      console.log("level",level);
    })
  }

}
