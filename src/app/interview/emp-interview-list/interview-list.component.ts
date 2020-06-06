import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { InterviewService } from '../interview.service';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css'],
  providers: [InterviewService]
})
export class EmpInterviewListComponent implements OnInit {

  delete(id: number) {
    console.log(id);
    this.http
      .delete(
        'http://localhost:8000/api/interview/' + id
      )

      .subscribe(posts => {
        console.log('deleted');
        this.ngOnInit()
      });

  }

  constructor(public interviewService: InterviewService, private http: HttpClient, private _flashMessagesService: FlashMessagesService) { }
  // loadedPosts = this.interviewService.fetchPosts();

  ngOnInit() {
    this.interviewService.fetchInterview();
    // this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success', timeout: 5000 });

    // console.log(this.interviewService.loadedPosts['data']);
    // console.log(this.interviewService.loadedPosts);
    // console.log('sssssssssss');


    // this.loadedPosts = this.interviewService.loadedPosts[0];
    // console.log(this.loadedPosts);

  }




  // private fetchPosts() {
  //   // this.isFetching = true;
  //   this.http
  //     .get(
  //       'http://localhost:8000/api/interviews'
  //     )
  //     .pipe(
  //       map(responseData => {
  //         const postsArray = [];
  //         for (const id in responseData) {
  //           if (responseData.hasOwnProperty(id)) {
  //             postsArray.push(responseData[id]);
  //           }
  //         }
  //         return postsArray;
  //       })
  //     )
  //     .subscribe(posts => {
  //       // this.isFetching = false;
  //       this.loadedPosts = posts;
  //       console.log((this.loadedPosts[0][5]));

  //     });
  // }

}






