import { Component } from '@angular/core';
import { MdDialog,MdDialogRef } from '@angular/material';

import { TaskService } from '../_service/task';
import { BloggerService } from '../_service/blogger';
import { AddFriendDialogComponent } from './addfriend';


@Component({
  selector: 'task',
  providers: [
    TaskService,
    BloggerService
  ],
  styleUrls: ['./task.component.css'],
  templateUrl: './task.component.html'
})
export class TaskComponent {
  bloggers=[{
    name:'yipeng',
    createTime:'2017-01-01 10:00',
    url:'https://yipeng.info'
  }];


  // TypeScript public modifiers
  constructor(public taskservice: TaskService, public bloggerservice: BloggerService,
    public dialog: MdDialog) {

  }

  ngOnInit() {
    console.log('hello `task` component');
    this.loadBloggers();
  }

  addBlogger(){
    console.log("addBlogger!!!!");
    // 模拟数据
    // this.bloggerservice.addBlogger().subscribe(data => {
    //   console.log('addBlogger:',data.data);
    // });

    let dialogRef = this.dialog.open(AddFriendDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.loadBloggers();
    });
  }

  startTasks() {
    console.log("startTasks!!!!");
    this.taskservice.startTasks().subscribe(data => {
      console.log("startTasks:",data.data);
    });
  }

  // 加载博主列表
  loadBloggers(){
    this.bloggerservice.getBloggers().subscribe(data => {
      this.bloggers = data.data;
    });
  }

}


