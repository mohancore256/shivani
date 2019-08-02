import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../model/project';
import { ProjectService } from '../../service/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  AddProjectFrom :FormGroup;
  project:Project;
  projectList:Project[];
  submitted = false;

  constructor(private fb :FormBuilder, private projectService:ProjectService) { }

  ngOnInit() {
    this.AddProjectFrom = this.fb.group({
      projectName : ["", Validators.required],
      startDate : ["", Validators.required],
      endDate : ["", Validators.required],
      priority : ["", Validators.required],
      manager : ["", Validators.required],  
    });
  }

  onRegistrationProject(){
   this.submitted = true;
   if (this.AddProjectFrom.invalid) {
    return;
  }
   this.project = new Project();
   this.project.projectName = this.AddProjectFrom.get("projectName").value;
   this.project.startDate = this.AddProjectFrom.get("startDate").value;
   this.project.endDate = this.AddProjectFrom.get("endDate").value;
   this.project.priority = this.AddProjectFrom.get("priority").value;
   this.project.manager = this.AddProjectFrom.get("manager").value;
   console.log(this.project);
   this.projectService.addProject(this.project).subscribe(response => { 
     this.project = response;
     console.log(this.project);

     this.loadAllProjectList();
    })
  }
   
  get f() { return this.AddProjectFrom.controls; }

  reset(){
    this.AddProjectFrom.reset();
    this.submitted = false;
  }
  
  loadAllProjectList(){
     this.projectService.loadAllProject().subscribe(response => {
      this.projectList = response as Project[];
    })
  }

  sort(source:string){
     if(source = "startDate"){
       

     }
  }
}
