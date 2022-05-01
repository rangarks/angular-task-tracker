import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Task} from  '../../Task';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  

  @Output() isAddNewTask = new EventEmitter();

  constructor(private taskService : TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data)=> {
      this.tasks = data;
    });
  }

  toggleReminder(task : Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  deleteTask(task : Task){
    this.taskService.deleteTask(task).subscribe((data)=>{
      this.tasks = this.tasks.filter(t => t.id !== task.id)
    }); 
  }

  addNewTask (task : Task) {
    this.taskService.addNewTask(task).subscribe((task)=> {
      this.tasks.push(task);
    })
  }

}
