import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LevelsService {

  constructor(private http: HttpClient) { }

  getLevels(pageParam={}){
    return this.http.get('/api/levels', {params: pageParam});
  }

  getLevel(id){
    return this.http.get(`/api/levels/${id}`);
  }

  updateLevel(id, data){
    return this.http.put(`/api/levels/${id}`, data).pipe(
      catchError(this.handleError<any>('updateLevel', []))
    );
  }

  addLevel(body){
    return this.http.post('/api/levels', body)
    .pipe(
      catchError(this.handleError<any>('addLevel', []))
    );
  }

  deleteLevel(id){
    return this.http.delete(`/api/levels/${id}`)
    .pipe(
      catchError(this.handleError<any>('deleteLevel', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return throwError(error);
    };
  }

}
