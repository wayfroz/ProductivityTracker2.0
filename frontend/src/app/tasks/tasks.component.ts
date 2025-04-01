import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  taskTitle = '';
  taskDescription = '';
  taskDate: string = '';
  tasks: { title: string; description: string; date: string }[] = [];
  
  addTask() {
    if (this.taskTitle.trim() && this.taskDate) { 
      this.tasks.push({
        title: this.taskTitle,
        description: this.taskDescription,
        date: this.taskDate
      });
      
      this.taskTitle = '';
      this.taskDescription = '';
      this.taskDate = '';
    }
  }
}

