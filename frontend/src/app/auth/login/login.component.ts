import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginFailed: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    if (this.username === 'admin' && this.password === '1234') {
      localStorage.setItem('student_id', '1');
      this.router.navigate(['/dashboard']);
    } else {
        this.loginFailed = true
        alert('Invalid credentials!');
    }
  }
}
