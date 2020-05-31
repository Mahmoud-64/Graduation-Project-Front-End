import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private getAllapplicationsUrl = "/api/applications";
  private getSingleapplicationUrl = "/api/applications/";
  private getAllStatusUrl = '/api/appstatuses';
  constructor(private http:HttpClient) { }

  getAllApplications() {
    return this.http.get<any>(this.getAllapplicationsUrl);
  }
  getFilterApplications(params) {
    return this.http.get<any>(this.getAllapplicationsUrl, {
      params: params
    });
  }

  getSingleApplication(id: string) {
    return this.http.get<any>(this.getSingleapplicationUrl + id);
  }

  deleteSingleApplication(id:string){
    return this.http.delete<any>(this.getSingleapplicationUrl + id);
  }

  getAllStatus(){
    return this.http.get<any>(this.getAllStatusUrl);
  }

  updateAppStatus(appId,statusId)
  {
    return this.http.put<any>(this.getSingleapplicationUrl+appId,{
      params:{status:statusId}
    });
  }
  appSubject = new Subject<any>();
}
