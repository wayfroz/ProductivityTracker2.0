import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  
  providers: [TaskService],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  constructor(private dialog: MatDialog, private taskService: TaskService) {} 
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

  tasks = [
    { date: new Date(this.currentYear, this.currentMonth, 4), task: 'Complete project report' },
    { date: new Date(this.currentYear, this.currentMonth, 5), task: 'Team meeting at 10 AM' },
    { date: new Date(this.currentYear, this.currentMonth, 6), task: 'Review code submissions' }
  ];
  

  ngOnInit() {
    this.loadTasks();
    this.generateCalendar();
    this.generateCurrentWeek();
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
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 6 = Saturday
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  
    this.calendarDays = [];
  
    // Add empty placeholders until the first actual day aligns correctly
    for (let i = 0; i < startingDayOfWeek; i++) {
      this.calendarDays.push({ date: null, display: null });
    }
  
    // Add real days of the month
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

  openTaskModal() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '400px',
      data: {
        title: '',
        description: ''
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasks.push(result);
        this.generateCalendar();
      }
    });
  }

  loadTasks() {
    this.taskService.getTasksByStudent(1).subscribe(
      (data) => {
        this.tasks = data;
        console.log('Fetched tasks:', data);
      },
      (error) => {
        console.error('Failed to fetch tasks:', error);
      }
    );
  }
  
  getTasksForDate(date: Date | null): string[] {
    if (!date) return [];
    return this.tasks
      .filter(task => task.date.toDateString() === date.toDateString())
      .map(task => task.task);
  }
  
}
