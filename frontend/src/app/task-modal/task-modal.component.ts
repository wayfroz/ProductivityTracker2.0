import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../services/task.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import * as moment from 'moment';

export interface TaskData {
  id?: number;
  title: string;
  description: string;
  due_date?: string;
  student_id?: number; 
}

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,  
    MatNativeDateModule
  ],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})

export class TaskModalComponent {
  taskTitle = '';
  taskDescription = '';
  dueDateOnly: string | Date | moment.Moment = '';
  dueTimeOnly: string = '';
  studentId: number = 123; 
  isEditMode = false;
  taskId?: number;

  constructor(
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskData
  ) {
    if (data) {
      this.isEditMode = true;
      this.taskId = data.id;
      this.taskTitle = data.title;
      this.taskDescription = data.description;
      this.dueDateOnly = data.due_date ? data.due_date.split('T')[0] : '';
    }
  }
  
  saveTask(): void {
    if (!this.dueDateOnly || !this.dueTimeOnly || !this.studentId) return;
  
    let dateStr: string;
  
    if (typeof this.dueDateOnly === 'string') {
      dateStr = this.dueDateOnly;
    } else if (this.dueDateOnly instanceof Date) {
      dateStr = this.dueDateOnly.toISOString().split('T')[0];
    } else if ('format' in this.dueDateOnly) {
      dateStr = this.dueDateOnly.format('YYYY-MM-DD');
    } else {
      console.error('Invalid dueDateOnly value:', this.dueDateOnly);
      return;
    }
  
    const [year, month, day] = dateStr.split('-').map(Number);
    const dueDate = new Date(year, month - 1, day);
  
    const [hours, minutes, seconds] = this.dueTimeOnly.split(':').map(Number);
    dueDate.setHours(hours, minutes, seconds);
  
    const taskPayload = {
      title: this.taskTitle,
      description: this.taskDescription,
      due_date: dueDate.toISOString(),
      student_id: this.studentId,
    };
  
    if (this.isEditMode && this.taskId != null) {
      this.taskService.updateTask(this.taskId, taskPayload).subscribe(
        (response) => {
          console.log('Task updated successfully:', response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    } else {
      this.taskService.createTask(taskPayload).subscribe(
        (response) => {
          console.log('Task created successfully:', response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error creating task:', error);
          if (error.error) {
            console.error('Backend error message:', error.error);
          }
        }
      );
    }
  }
  
  deleteTask(): void {
    if (this.taskId != null) {
      this.taskService.deleteTask(this.taskId).subscribe(
        (response) => {
          console.log('Task deleted successfully:', response);
          this.dialogRef.close({ deleted: true });
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
