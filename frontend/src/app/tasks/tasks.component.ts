import { Component, OnInit } from '@angular/core';
import { HttpClient }        from '@angular/common/http';
import { Router }            from '@angular/router';
import { CommonModule }      from '@angular/common';
import { FormsModule }       from '@angular/forms';

@Component({
  selector:    'app-tasks',
  standalone:  true,
  imports:    [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls:   ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks = {
    title:      '',
    date:       '',
    student_id: 0
  };

  constructor(
    private http:   HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const raw = localStorage.getItem('student_id');
    const id  = raw ? +raw : 0;

    if (!id) {
      this.router.navigate(['/login']);
      return;
    }

    this.tasks.student_id = id;
  }

  onSubmit(): void {
    const payload = {
      title:      this.tasks.title,
      due_date:   this.tasks.date,
      student_id: this.tasks.student_id
    };

    this.http
      .post('http://localhost:8000/tasks', payload)
      .subscribe({
        next: () => {
          console.log('Task added:', payload);
          this.router.navigate(['/calendar']);
        },
        error: err => console.error('Error adding task:', err)
      });
  }
}
