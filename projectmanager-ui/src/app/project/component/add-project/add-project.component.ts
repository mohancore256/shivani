import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Project } from '../../model/project';
import { ProjectService } from '../../service/project.service';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/user/service/user.service';
import { User } from 'src/app/user/model/user';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [DatePipe]
})
export class AddProjectComponent implements OnInit {

  AddProjectFrom: FormGroup;
  project: Project;
  projectList: Project[];
  submitted = false;
  searchInput:string;
  userList:User[];
  searchUserResult:User[];
  

  constructor(private fb: FormBuilder, private userService: UserService,private projectService: ProjectService,private datePipe: DatePipe) { }

  ngOnInit() {
    this.AddProjectFrom = this.fb.group({
      projectName: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      priority: ["", Validators.required],
      manager: ["", Validators.required],
      enableDateFields: [false]
    });
    this.reset();
    this.AddProjectFrom.get("startDate").disable();
    this.AddProjectFrom.get("endDate").disable();
    this.AddProjectFrom.get("priority").setValue(0);
    this.loadAllProjectList();
    
  }

  showDateFields(){
    let showDataFieldProp= this.AddProjectFrom.get("enableDateFields").value;
    if(showDataFieldProp){
      this.AddProjectFrom.get("startDate").disable();
      this.AddProjectFrom.get("endDate").disable();
      this.AddProjectFrom.get("startDate").setValue("");
      this.AddProjectFrom.get("endDate").setValue("");
    }else{
      this.AddProjectFrom.get("startDate").enable();
      this.AddProjectFrom.get("endDate").enable();    
      let curr_date=  new Date(); 
      this.AddProjectFrom.get("startDate").setValue(this.datePipe.transform(curr_date, 'yyyy-MM-dd'));
      curr_date.setDate(curr_date.getDate()+1);
      this.AddProjectFrom.get("endDate").setValue(this.datePipe.transform(curr_date, 'yyyy-MM-dd'));
    }
  }
  onRegistrationProject() {
    this.submitted = true;
    if (this.AddProjectFrom.invalid) {
      console.log("Not avalid form")
      return;
    }

    if(this.AddProjectFrom.get("startDate").value>
    this.AddProjectFrom.get("endDate").value){
      alert("End date must be after the Start date");
      return;
    }

    this.project = new Project();
    this.project.projectName = this.AddProjectFrom.get("projectName").value;
    this.project.startDate = this.AddProjectFrom.get("startDate").value;
    this.project.endDate = this.AddProjectFrom.get("endDate").value;
    this.project.priority = this.AddProjectFrom.get("priority").value;
    this.project.manager = this.AddProjectFrom.get("manager").value;
    this.project.status="IN-COMPLETE"
    console.log(this.project);
    this.projectService.addProject(this.project).subscribe(response => {
      this.project = response as Project;
      console.log(this.project);
      this.reset();
      this.loadAllProjectList();
    })
  }

  get f() { return this.AddProjectFrom.controls; }

  reset() {
    this.AddProjectFrom.reset();
    this.submitted = false;
  }

  loadAllProjectList() {
    this.projectService.loadAllProject().subscribe(response => {
      this.projectList = response as Project[];
      this.userService.getAllUser().subscribe(resp => {
        this.userList = resp as User[];
      });
    });
  }

  sortingAction(source: string) {
    if (source = 'startDate') {
      this.projectList = this.projectList.sort((a, b) => new Date(a.startDate).getDate() - new Date(b.startDate).getDate());
    } else if (source = 'endDate') {
      this.projectList = this.projectList.sort((a, b) => new Date(a.endDate).getDate() - new Date(b.endDate).getDate());
    }
    else if (source = 'priority') {
       this.projectList = this.projectList.sort((a,b) => a.priority - b.priority );
    }
    else if (source = 'completed') {

    }
  }

  performSearch(){
    console.log(this.searchInput);
    this.projectService.loadAllProject().subscribe(response => {
      this.projectList = response as Project[];
      this.projectList = this.projectList.filter(item =>(item.projectName.search(new RegExp(this.searchInput)) > -1));
    });      
  }

  searchUser(){
    console.log(this.searchInput);   
    this.submitted = false;
    this.searchUserResult = this.userList.filter(item =>(item.firstName.search(new RegExp(this.searchInput)) > -1));    
  }
  
}
