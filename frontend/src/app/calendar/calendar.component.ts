import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { RouterLink } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';

interface RawTask {
  id:         number;
  title:      string;
  due_date:   string;
  student_id: number;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {
  allTasks: RawTask[] = [];
  tasks: { date: Date; task: string }[] = [];

  constructor(
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  viewMode: 'month' | 'week' = 'month';
  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  calendarDays: { date: Date | null; display: number | null }[] = [];
  currentWeekDays: { date: Date; label: string }[] = [];

  ngOnInit() {
    this.generateCalendar();
    this.generateCurrentWeek();
    this.fetchTasks();
  }

  previousPeriod() {
    if (this.viewMode === 'month') {
      this.previousMonth();
    } else {
      this.currentDate.setDate(this.currentDate.getDate() - 7);
      this.generateCurrentWeek();
    }
  }

  nextPeriod() {
    if (this.viewMode === 'month') {
      this.nextMonth();
    } else {
      this.currentDate.setDate(this.currentDate.getDate() + 7);
      this.generateCurrentWeek();
    }
  }

  getHeaderTitle(): string {
    return this.viewMode === 'month'
      ? `${this.monthNames[this.currentMonth]} ${this.currentYear}`
      : `Week of ${this.formatDate(this.currentWeekDays[0]?.date)}`;
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    const month = this.monthNames[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}`;
  }

  generateCalendar() {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    this.calendarDays = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      this.calendarDays.push({ date: null, display: null });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      this.calendarDays.push({ date, display: day });
    }
  }

  generateCurrentWeek() {
    const current = new Date(this.currentDate);
    const weekStart = new Date(current.setDate(current.getDate() - current.getDay()));
    this.currentWeekDays = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      this.currentWeekDays.push({
        date,
        label: this.dayNames[i]
      });
    }
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  isToday(date: Date | null): boolean {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  fetchTasks(): void {
  const raw = localStorage.getItem('student_id');
  const id  = raw ? +raw : 0;
  if (!id) {
    console.warn('No student logged in; skipping fetch');
    return;
  }

  this.http
    .get<RawTask[]>(`http://localhost:8000/tasks/student/${id}`)
    .subscribe(tasks => this.allTasks = tasks);
  }

  getTasksForDate(date: Date | null): RawTask[] {
    if (!date) return [];
    return this.allTasks
      .filter(task => {
        const taskDate = new Date(task.due_date);
        return (
          taskDate.getFullYear() === date.getFullYear() &&
          taskDate.getMonth()    === date.getMonth()    &&
          taskDate.getDate()     === date.getDate()
        );
      });
  }
  
  
  addTask(existingTask?: { date: Date; task: string }, index?: number) {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: existingTask ? {
        title: existingTask.task,
        date: existingTask.date.toISOString().split('T')[0],
        time: existingTask.date.toTimeString().slice(0, 5),
      } : null
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newTask = {
          date: result.date,
          task: result.title,
        };
        if (index !== undefined) {
          this.tasks[index] = newTask;
        } else {
          this.tasks.push(newTask);
        }
      }
    });
  }

  
  onTaskClick(date: Date, taskTitle: string, index: number) {
    const matchingTask = this.allTasks.find(t => {
      const taskDate = new Date(t.due_date);
      return (
        taskDate.getFullYear() === date.getFullYear() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getDate() === date.getDate() &&
        t.title === taskTitle
      );
    });
  
    if (matchingTask) {
      const dialogRef = this.dialog.open(TaskModalComponent, {
        data: {
          id: matchingTask.id,
          title: matchingTask.title,
          due_date: matchingTask.due_date
        }
      });
  
      dialogRef.afterClosed().subscribe((updatedData) => {
        if (updatedData) {
          this.updateTask(updatedData);
        }
      });
    }
  }
  

  updateTask(updatedTask: any) {
    this.http.put(`http://localhost:8000/tasks/${updatedTask.id}`, {
      title: updatedTask.title,
      due_date: updatedTask.date // must send the correct key names matching backend
    }).subscribe(() => {
      console.log('Task updated successfully');
      this.fetchTasks(); // Reload tasks after updating
    });
  }


  deleteTask(taskId: number): void {
    this.http
      .delete(`http://localhost:8000/tasks/${taskId}`)
      .subscribe({
        next: () => this.fetchTasks(), 
        error: err => console.error('Error deleting task', err)
      });
  }
}
