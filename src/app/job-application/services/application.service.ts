import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private getAllapplicationsUrl = "/api/applications";
  private getSingleapplicationUrl = "/api/applications/";
  constructor(private http:HttpClient) { }

  getAllApplications() {
    return this.http.get<any>(this.getAllapplicationsUrl);
  }

  getSingleApplication(id: string) {
    return this.http.get<any>(this.getSingleapplicationUrl + id);
  }

  deleteSingleApplication(id:string){
    return this.http.delete<any>(this.getSingleapplicationUrl + id);
  }
  appSubject = new Subject<any>();
}
