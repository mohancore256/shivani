import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './user/component/add-user/add-user.component';
import { AddProjectComponent } from './project/component/add-project/add-project.component';
import { AddTaskComponent } from './task/component/add-task/add-task.component';
import { ViewTaskComponent } from './task/component/view-task/view-task.component';

const routes: Routes = [
  {path:'addUser', component:AddUserComponent},
  {path:'addProject', component:AddProjectComponent},
  {path:'addTask', component:AddTaskComponent},
  {path:'viewTask', component:ViewTaskComponent},
  {path:'**', component:AddUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
