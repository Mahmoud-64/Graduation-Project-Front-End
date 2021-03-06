import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Employee } from '../models/employee';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesUrl = '/api/employees/';  // URL to web api
  constructor(private http: HttpClient) { }


    getEmployees(params?): Observable<Employee>{
      return this.http.get<Employee>(this.employeesUrl, {params: params});
    }
    getEmployee(employeeId): Observable<Employee>{
      return this.http.get<Employee>(this.employeesUrl+employeeId);
    }
    updateEmployee(employeeId, employee: Employee): Observable<any> {
      return this.http.put(this.employeesUrl+employeeId, employee)
      .pipe(
        catchError(this.handleError<Employee[]>('updateEmployee', []))
      );
    }

    addEmployee(employee): Observable<any> {
      return this.http.post(this.employeesUrl, employee)
      .pipe(
        catchError(this.handleError<Employee[]>('addEmployee', []))
      );
    }

    deleteEmployee(employeeId): Observable<Employee>{
      return this.http.delete<Employee>(this.employeesUrl+employeeId);
    }


    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        return throwError(error);
      };
    }

}
