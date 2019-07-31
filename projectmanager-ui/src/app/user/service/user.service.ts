import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  myUrl =  "http://localhost:8080/projectManager/user";

  constructor(private http: HttpClient) { }

  saveUser(user: User): Observable<any> {
    return this.http.post(this.myUrl + "/save", user);
  }

  getAllUser():Observable<any>{
    return this.http.get(this.myUrl+"/getAll");
  }
} 
