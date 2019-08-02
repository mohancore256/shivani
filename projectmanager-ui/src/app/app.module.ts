import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddUserComponent } from './user/component/add-user/add-user.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { User } from './user/model/user';
import { AddProjectComponent } from './project/component/add-project/add-project.component';
import { ViewComponent } from './user/component/view/view.component';
import { ViewUserComponent } from './user/component/view-user/view-user.component';
import { ViewProjectComponent } from './project/component/view-project/view-project.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    HeaderComponent,
    FooterComponent,
    AddProjectComponent,
    ViewComponent,
    ViewUserComponent,
    ViewProjectComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
