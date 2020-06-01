import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeekerService } from '../../../service/seeker.service';
import { Seeker } from '../../../models/seeker';

@Component({
  selector: 'app-seekers',
  templateUrl: './seekers.component.html',
  styleUrls: ['./seekers.component.css']
})
export class SeekersComponent implements OnInit {
  users: Array<Seeker> = [{
    id: '',
    name: '',
    email: '',
    role: ''
  }];
  changed=true;

  constructor(
    private seekerService: SeekerService,
    private router: Router) { }

  ngOnInit(): void {
    this.seekerService.getSeekers().subscribe(users => {
      this.users = users.data;
      console.log(this.users);
    })
  }
  crudOperation(crudName, id) {
    switch (crudName) {
      case 'show':
        console.log('show', id, this.router.url);
        this.router.navigateByUrl(`/admin/seeker/show/${id}`);
        break;
      case 'edit':
        console.log('edit');
        this.router.navigateByUrl(`/admin/seeker/edit/${id}`);
        break;
      case 'delete':
        console.log('delete');
        this.seekerService.deleteSeeker(id).subscribe(result=>{
          console.log(result);
          this.seekerService.getSeekers().subscribe(users => {
            this.users = users.data;
            console.log(this.users);
          })
        });

        break;
    }
  }

}
