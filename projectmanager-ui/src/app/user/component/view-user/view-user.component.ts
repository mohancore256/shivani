import { Component, OnInit, Input } from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  
  @Input()
   public userDetails:User;

  constructor(private userService:  UserService, private addUserComponent:AddUserComponent) { }

  ngOnInit() {
  
  }
  
  editUser(){
    this.userService.updateUser(this.userDetails).subscribe(resp => {
        this.userDetails = resp as User;
        console.log(this.userDetails);
    });
  }

  deleteUser(){
    this.userService.deleteUser(this.userDetails).subscribe( resp => {
      this.addUserComponent.loadAllUser();
    })
  }

}
