import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesUrl = '/api/employees/';  // URL to web api
  constructor(private http: HttpClient) { }


    getEmployees(): Observable<Employee>{
      return this.http.get<Employee>(this.employeesUrl);
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

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        return throwError(error);
      };
    }

}
