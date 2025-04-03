import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Tasks.component.html',
  styleUrls: ['./Tasks.component.scss']
})

export class TasksComponent {
  tasks =  { title: '', description: '', date: ''};

  onSubmit(){
    console.log('Task Added')
  }
}