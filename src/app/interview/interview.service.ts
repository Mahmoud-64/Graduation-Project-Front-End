import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InterviewService {
    loadedInterview: any[] = [];
    singleInterview;
    constructor(private http: HttpClient) { }


    public fetchInterview() {
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
                this.loadedInterview = interviews;
                // console.log(typeof (this.loadedInterview));

            });
    }

    public fetchSingleInterview(id) {
        return this.http
            .get(
                'http://localhost:8000/api/interview/' + id
            );

    }

    public updateInterview(id, postData) {
        return this.http
            .put(
                'http://localhost:8000/api/interview/' + id,
                postData,
            );
    }

    public addInterview(postData) {
        return this.http
            .post(
                'http://localhost:8000/api/interview',
                postData,
            )
    }

    public deleteInterview(id) {
        return this.http
            .delete(
                'http://localhost:8000/api/interview/' + id
            )

    }

}
