import { Component, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    CommonModule,
  
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  displayedColumns: string[] = ['day', 'task'];
  tasks = [
    { day: 'Monday', task: 'Complete project report' },
    { day: 'Tuesday', task: 'Team meeting at 10 AM' },
    { day: 'Wednesday', task: 'Review code submissions' }
  ];
}