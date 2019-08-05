import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../model/project';
import { ProjectService } from '../../service/project.service';
import { AddProjectComponent } from '../add-project/add-project.component';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  @Input()
  projectDetails:Project;
  
  constructor(private projectService:ProjectService, private addProject :AddProjectComponent) { }

  ngOnInit() {
  }

  editProject(){
       
   this.projectService.editProject(this.projectDetails).subscribe( response => {
     this.projectDetails = response as Project;
   });
  }

  suspendProject(){
    this.projectDetails.status="SUSPENDED";
    this.projectService.editProject(this.projectDetails).subscribe( response => {
      this.projectDetails = response as Project;
    });
   }
  deleteProject(){
    this.projectService.deleteProject(this.projectDetails).subscribe( resp => {
      this.addProject.loadAllProjectList();
    })
  }

}
