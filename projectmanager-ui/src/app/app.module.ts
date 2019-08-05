import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './common/footer/footer/footer.component';
import { HeaderComponent } from './common/header/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddProjectComponent } from './project/component/add-project/add-project.component';
import { ViewProjectComponent } from './project/component/view-project/view-project.component';
import { AddUserComponent } from './user/component/add-user/add-user.component';
import { ViewUserComponent } from './user/component/view-user/view-user.component';
import { AddTaskComponent } from './task/component/add-task/add-task.component';
import { FilterPipe } from './filter.pipe';
import { ViewTaskComponent } from './task/component/view-task/view-task.component';
import { TaskDetailComponent } from './task/component/task-detail/task-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AddProjectComponent,
    ViewProjectComponent,
    AddUserComponent,
    ViewUserComponent,
    AddTaskComponent,
    FilterPipe,
    ViewTaskComponent,
    TaskDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
