import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  affirmations: string[] = [
    "Every lecture, every page, every assignment is bringing you closer to your goals.",
    "Your hard work today builds the success of tomorrow.",
    "Believe in the power of your education and persistence.",
    "Progress, not perfection — keep moving forward!",
    "You are investing in yourself with every study session.",
    "Small study victories today create big achievements tomorrow.",
    "You have everything you need to succeed within you.",
    "Discipline today means freedom tomorrow.",
    "Stay focused — your dreams are worth the effort.",
    "Your future self will thank you for the time you're putting in today."
  ];

  todayAffirmation: string = '';
  todayTasks: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.pickRandomAffirmation();
    this.fetchTodayTasks();
  }

  pickRandomAffirmation() {
    const randomIndex = Math.floor(Math.random() * this.affirmations.length);
    this.todayAffirmation = this.affirmations[randomIndex];
  }

  fetchTodayTasks() {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  this.http.get<any[]>(`http://localhost:8000/tasks/student/1`).subscribe(tasks => {
    this.todayTasks = tasks.filter(task => {
      const taskDate = new Date(task.due_date);
      return (
        taskDate.getFullYear() === todayYear &&
        taskDate.getMonth() === todayMonth &&
        taskDate.getDate() === todayDate
      );
    });
  });
}

}
