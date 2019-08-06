import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../../model/task';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { TaskService } from '../../service/task.service';
import { User } from 'src/app/user/model/user';
import { Project } from 'src/app/project/model/project';
import { UserService } from 'src/app/user/service/user.service';
import { ProjectService } from 'src/app/project/service/project.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  AddTaskForm :FormGroup;
  task:Task;
  submitted = false;
  userList:User[];
  columnName:string = "firstName";
  projectsList:Project[];
  columnNameForProjectSearch:string = "projectName";
  userProjectTask:Task = new Task();

  constructor(private fb :FormBuilder, private taskService :TaskService, private userService: UserService,private projectService: ProjectService) { }

  ngOnInit() {
   this.AddTaskForm = this.fb.group({
        taskId : ['', Validators.required],
        parentId : ['', Validators.required],
        projectId : ['', Validators.required],
        taskName : ['', Validators.required],
        startDate : ['', Validators.required],
        endDate : ['', Validators.required],
        priority : ['', Validators.required]
   });
   this.reset();
   this.loadAllProjectList();
  }

  loadAllProjectList() {
    this.userService.getAllUser().subscribe(resp => {
      this.userList = resp as User[];
      console.log("loading the Initlize datta");
      console.log(this.userList);
      
      this.projectService.loadAllProject().subscribe(response => {
        this.projectsList = response as Project[];
        console.log(this.projectsList);
      });
    });
  }
  onAddingTask(){
  //  this.submitted = true;
  //  if(this.AddTaskForm.invalid){
  //    return;
  //  }

  //  if(this.AddTaskForm.get("startDate").value>
  //  this.AddTaskForm.get("endDate").value){
  //    alert("End date must be after the Start date");
  //    return;
  //  }
   this.task = new Task();
   this.task.taskName = this.AddTaskForm.get("taskName").value;
   this.task.priority = this.AddTaskForm.get("priority").value;
   this.task.startDate = this.AddTaskForm.get("startDate").value;
   this.task.endDate = this.AddTaskForm.get("endDate").value;
   this.task.users = this.userProjectTask.users;
   this.task.projects = this.userProjectTask.projects;
   console.log("Before Saving"+this.task);
   console.log(this.task);
   this.taskService.addTask(this.task).subscribe(response => {
     this.task = response;
     console.log("After Saving"+this.task);
     })
   }

   get f() { return this.AddTaskForm.controls; }

   reset(){
     this.AddTaskForm.reset();
     this.submitted = false;
   }

   populateUser(mangerUser){
    console.log("output ...****")
    console.log(mangerUser);
    this.userProjectTask.users = [];
    this.userProjectTask.users.push(mangerUser);
  }

  populateProject(taskProject){
    this.userProjectTask.projects = taskProject;    
  }
}
