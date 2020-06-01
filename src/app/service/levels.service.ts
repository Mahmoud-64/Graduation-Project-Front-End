import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LevelsService {

  constructor(private http: HttpClient) { }

  getLevels(){
    return this.http.get('/api/levels');
  }

  getLevel(id){
    return this.http.get(`/api/levels/${id}`);
  }

  updateLevel(id, data){
    return this.http.put(`/api/levels/${id}`, data);
  }

  addLevel(body){
    return this.http.post('/api/levels', body);
  }

  deleteLevel(id){
    return this.http.delete(`/api/levels/${id}`);
  }

}
