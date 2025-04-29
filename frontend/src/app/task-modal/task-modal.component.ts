import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'; // Correct import

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    CommonModule,    
    FormsModule, 
    MatInputModule,
    MatDialogModule,
    MatButtonModule 
  ],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {
  title: string = '';
  date: string = '';
  reminderTime: string = '';

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data) {
      this.title = this.data.title || '';
      this.date = this.data.due_date ? new Date(this.data.due_date).toISOString().substring(0, 10) : '';
      this.reminderTime = this.data.reminder_time ? this.data.reminder_time.substring(0,16) : '';
    }
  }

  saveTask() {
    const task = {
      title: this.title,
      date: new Date(this.date),
      id: this.data?.id, // Keep the ID so we know what to update
      reminderTime: this.reminderTime
    };
    this.dialogRef.close(task);
  }
  

  closeModal() {
    this.dialogRef.close();
  }
}
