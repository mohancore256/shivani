import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Task } from '../model/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  myAppUrl =  "http://localhost:8080/projectManager/task";

  addTask(task: Task):Observable<any>{
   return this.http.post(this.myAppUrl+"/save", task);
  }

  updateTask(task:Task):Observable<any>{
    return this.http.post(this.myAppUrl+"/update", task);
  }

  deleteTask(task:Task){
    const params = new HttpParams().set("taskId", task.taskId as unknown as string);
    return this.http.delete(this.myAppUrl+"/delete", {params});
  }

  getAllTask():Observable<any>{
    return this.http.get(this.myAppUrl+"getAll");
  }

}
