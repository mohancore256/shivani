import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User;
  userList: User[];
  UserRegistrationForm: FormGroup;
  submitted = false;
  searchInput:string;


  constructor(private fb: FormBuilder, private userService: UserService) { }

  onRegistration() {
    this.submitted = true;
    console.log(this.UserRegistrationForm);
    if (this.UserRegistrationForm.invalid) {
      return;
    }
    this.user = new User;
    this.user.firstName = this.UserRegistrationForm.get("firstName").value;
    this.user.lastName = this.UserRegistrationForm.get("lastName").value;
    this.user.employeeId = this.UserRegistrationForm.get("employeeId").value;
    console.log(this.user);
    this.userService.saveUser(this.user).subscribe(resp => {
      this.user = resp;
      console.log(this.user);
      if (this.user.userId != null && this.user.userId != undefined) {
        this.userService.getAllUser().subscribe(resp => {
          this.userList = resp as User[];
        })
      }
    });

  }

  ngOnInit() {
    this.UserRegistrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employeeId: ['', Validators.required]
    });
    this.userService.getAllUser().subscribe(resp => {
      this.userList = resp;
    })
  }

  get f() { return this.UserRegistrationForm.controls; }

  sortAction(source: string) {
    if (source == 'firstName') {
     this.userList = this.userList.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (source == 'lastName') {
      this.userList = this.userList.sort((a, b) => a.lastName.localeCompare(b.lastName));
    } else if (source == 'employeeId') {
      this.userList = this.userList.sort((a, b) => a.employeeId.localeCompare(b.employeeId));
    }
  }

  loadAllUser(){
    this.userService.getAllUser().subscribe(resp => {
      this.userList = resp as User[];
    });
  }

  performSearch(){
    console.log(this.searchInput);
    this.userService.getAllUser().subscribe(resp => {
      this.userList = resp as User[];
      this.userList = this.userList.filter(item =>(item.firstName.search(new RegExp(this.searchInput)) > -1));
    });      
  }

  reset(){
    this.UserRegistrationForm.reset();
    this.submitted = false;
  }

}
