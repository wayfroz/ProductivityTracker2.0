import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    CommonModule,    
    FormsModule, 
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {
  title: string = '';
  description: string = '';
  date: string = '';
  time: string = '';
  

  constructor(public dialogRef: MatDialogRef<TaskModalComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}

  saveTask() {
    const task = {
      title: this.title,
      description: this.description,
      date: new Date(this.date + ' ' + this.time),
    };
    this.dialogRef.close(task);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
