import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
