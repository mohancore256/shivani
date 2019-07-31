import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private userService:  UserService) { }

  ngOnInit() {
  
  }

}
