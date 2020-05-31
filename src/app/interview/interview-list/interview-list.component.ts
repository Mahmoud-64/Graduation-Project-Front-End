import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { InterviewService } from '../interview.service';


@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css'],
  providers: [InterviewService]
})
export class InterviewListComponent implements OnInit {

  delete(id: number) {
    console.log(id);
    this.http
      .delete(
        'http://localhost:8000/api/interview/' + id
      )

      .subscribe(posts => {
        console.log('deleted');

      });

  }

  constructor(public interviewService: InterviewService, private http: HttpClient) { }
  // loadedPosts = this.interviewService.fetchPosts();

  ngOnInit() {
    this.interviewService.fetchInterview();
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






