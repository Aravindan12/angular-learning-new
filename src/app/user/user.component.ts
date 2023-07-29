import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  users: User[] = [];
  @Input() user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
  };
  @Input() action: 'create' | 'edit' = 'create';
  ngOnInit(): void {
    this.getAllusers()
  }

  getAllusers(){
    this.userService.getUsers()
    .subscribe(users => {this.users = users.data});
  }
  userForm = this.formBuilder.group({
    name: '',
    email: '',
    password: ''
  });

  onSubmit(): void {
    const userObj = this.user;
    if (this.action === 'create') {
      this.userService.create(userObj)
      .subscribe(response => {
        this.getAllusers()
        console.log(response)
      })
    } else {
      this.userService.update(userObj)
      .subscribe(response => {
        this.getAllusers()
        this.action = 'create'
        console.log(response)
      })
    }
    this.userForm.reset();
  }

  edit(id:any): void {
    this.action = 'edit'
    this.userService.getUser(id)
    .subscribe(user => {
    	this.user = user.data
      console.log(user.data)
    })
  }

  delete(id:any): void {
    this.userService.delete(id)
    .subscribe(response => {
      this.getAllusers()
      console.log(response)
    })
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {}
}
