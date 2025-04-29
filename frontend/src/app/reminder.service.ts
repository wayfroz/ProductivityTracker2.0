import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface RawReminder {
  id:            number;
  task_id:       number;
  reminder_time: string;  // ISO datetime
  task_title:    string;
}

@Injectable({ providedIn: 'root' })
export class ReminderService {
  private api = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  init(): void {
    const sid = +localStorage.getItem('student_id')!;
    if (!sid) return;

    this.http
      .get<RawReminder[]>(`${this.api}/tasks/reminders/student/${sid}`)
      .subscribe(rems => {
        rems.forEach(r => {
          const delay = new Date(r.reminder_time).getTime() - Date.now();
          if (delay > 0) {
            setTimeout(() => {
              alert(`⏰ Reminder: ${r.task_title}`);
            }, delay);
          }
        });
      });
  }
}
