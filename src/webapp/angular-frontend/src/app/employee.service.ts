import { Injectable } from '@angular/core';
import { Employee } from './employee';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
//import { toPromise } from 'rxjs/add/operators/toPromise'

@Injectable()
export class EmployeeService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getEmployee():  Promise<Employee[]> {
    return this.http.get(this.baseUrl + '/api/emps/')
      .toPromise()
      .catch(this.handleError);
  }

  createEmployee(empData: Employee): Promise<Employee> {
    return this.http.post(this.baseUrl + '/api/emps/', empData)
      .toPromise()
      .catch(this.handleError);
  }

  updateEmployee(empData: Employee): Promise<Employee> {
    return this.http.put(this.baseUrl + '/api/emps/' + empData.id, empData)
      .toPromise()
      .catch(this.handleError);
  }

  deleteEmployee(id: string): Promise<any> {
    return this.http.delete(this.baseUrl + '/api/emps/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}
