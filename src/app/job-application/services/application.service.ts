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
  private getSingleStatusUrl = '/api/appstatuses/';
  constructor(private http:HttpClient) { }

  getAllApplications(params={}) {
    return this.http.get<any>(this.getAllapplicationsUrl, {params});
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
  updateStatus(statusId,data){
    return this.http.put<any>(this.getSingleStatusUrl+statusId,data);
  }

  deleteStatus(statusId){
    return this.http.delete<any>(this.getSingleStatusUrl + statusId);
  }

  addNewStatus(status){
    return this.http.post<any>(this.getAllStatusUrl,status);
  }
  appSubject = new Subject<any>();
}
