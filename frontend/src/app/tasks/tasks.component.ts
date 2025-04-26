import { Component } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent {
  tasks = {
    title: '',
    description: '',
    date: '',
    student_id: 1 // Replace with real auth ID later
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const payload = {
      title: this.tasks.title,
      due_date: this.tasks.date,
      student_id: this.tasks.student_id
    };

    this.http.post('http://localhost:8000/tasks', payload)
      .subscribe(
        (response) => {
          console.log('Task added:', response);
          this.router.navigate(['/calendar']);
        },
        (error) => {
          console.error('Error adding task:', error);
        }
      );
  }
}
