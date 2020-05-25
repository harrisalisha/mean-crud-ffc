import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';

import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee : Employee;
  employees : Employee[];
  //add baseurl same addrs in nodejs controlleremployee router
  readonly baseURL = 'http://localhost:3000/employees';

  constructor( private http: HttpClient) { }
  
  //to be able to do post req, but we have to import httpClient n module
  // dont forget inculde it in appmodule
  postEmployee(emp : Employee){
    return this.http.post(this.baseURL, emp);
  }
  //inorder to get all employees from database
  getEmployeeList() {
    return this.http.get(this.baseURL);
  }

  putEmployee(emp: Employee){
    return this.http.put(this.baseURL +`/${emp._id}`, emp);
  }

  deleteEmployee(_id : string ){
    return this.http.delete(this.baseURL + `/${_id}`);
  }


}
