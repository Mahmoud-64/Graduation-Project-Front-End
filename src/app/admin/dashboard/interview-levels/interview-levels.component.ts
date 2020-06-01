import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelsService } from '../../../service/levels.service';

@Component({
  selector: 'app-interview-levels',
  templateUrl: './interview-levels.component.html',
  styleUrls: ['./interview-levels.component.css']
})
export class InterviewLevelsComponent implements OnInit {
  levels;
  constructor(private router: Router,
              private levelsService: LevelsService) { }

  ngOnInit(): void {
    this.levelsService.getLevels().subscribe(result=>{
      this.levels = result["data"];
      console.log(this.levels);
    });
  }

  crudOperation(crudName, id) {
    switch (crudName) {
      case 'new':
        console.log('new', id);
        this.router.navigateByUrl(`/admin/levels/new`);
        break;
      case 'show':
        console.log('show', id);
        this.router.navigateByUrl(`/admin/levels/${id}`);
        break;
      case 'edit':
        console.log('edit');
        this.router.navigateByUrl(`/admin/levels/edit/${id}`);
        break;
      case 'delete':
        console.log('delete');
        this.levelsService.deleteLevel(id).subscribe(result=>{
          this.levelsService.getLevels().subscribe(result=>{
            this.levels = result["data"];
            console.log(this.levels);
          });
        });
        break;
    }
  }

}
