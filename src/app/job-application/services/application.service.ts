import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private getAllapplicationsUrl = "http://127.0.0.1:8001/api/applications";
  private getSingleapplicationUrl = "http://127.0.0.1:8001/api/applications/";
  constructor(private http:HttpClient) { }

  getAllApplications() {
    return this.http.get<any>(this.getAllapplicationsUrl);
  }

  getSingleApplication(id: string) {
    return this.http.get<any>(this.getSingleapplicationUrl + id);
  }
}
