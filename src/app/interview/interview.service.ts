import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class InterviewService {
    loadedInterview: any[];
    constructor(private http: HttpClient) { }

    public fetchInterview() {
        // this.isFetching = true;
        this.http
            .get(
                'http://localhost:8000/api/interviews'
            )
            .pipe(
                map(responseData => {
                    const interviewaArray = [];
                    for (const id in responseData) {
                        if (responseData.hasOwnProperty(id)) {
                            interviewaArray.push(responseData[id]);
                        }
                    }
                    return interviewaArray;
                })
            )
            .subscribe(interviews => {
                // this.isFetching = false;
                this.loadedInterview = interviews;
                console.log(typeof (this.loadedInterview));

            });
    }

    public fetchSingleInterview(id) {
        // this.isFetching = true;
        this.http
            .get(
                'http://localhost:8000/api/interview/' + id
            )
            // .pipe(
            //     map(responseData => {
            //         const interviewaArray = [];
            //         for (const id in responseData) {
            //             if (responseData.hasOwnProperty(id)) {
            //                 interviewaArray.push(responseData[id]);
            //             }
            //         }
            //         return interviewaArray;
            //     })
            // )
            .subscribe(interview => {
                // this.isFetching = false;
                // this.loadedInterview = interviews;
                console.log(interview);
                return interview;

            });
    }
}
