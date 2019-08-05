import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  myAppUrl =  "http://localhost:8080/projectManager/project";

  addProject(project:Project):Observable<any>{
    console.log(project);
    return this.http.post(this.myAppUrl+"/save", project);
  }

  loadAllProject():Observable<any>{
    return this.http.get(this.myAppUrl+"/getAll");
  }

  deleteProject(project:Project){
    const params = new HttpParams().set('projectId', project.projectId )
     return this.http.delete(this.myAppUrl+"/delete", {params});
  }

  editProject(project:Project):Observable<any>{
    return this.http.post(this.myAppUrl+"/update", project);
  }
}
