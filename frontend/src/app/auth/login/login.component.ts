import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { AuthService, LoginRequest } from '../auth.service';

@Component({
  selector:    'app-login',
  standalone:  true,
  imports:    [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls:   ['./login.component.scss']
})
export class LoginComponent {
  email       = '';
  password    = '';
  loginFailed = false;

  constructor(
    private auth:   AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    const payload: LoginRequest = {
      email:    this.email.trim(),
      password: this.password
    };

    this.auth.login(payload).subscribe({
      next: (res: { message: string; id: number; email: string; name: string }) => {
        localStorage.setItem('student_id', res.id.toString());
        localStorage.setItem('student_name', res.name);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.loginFailed = true;
      }
    });
  }
}