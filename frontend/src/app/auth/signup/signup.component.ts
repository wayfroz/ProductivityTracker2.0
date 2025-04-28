import { Component }    from '@angular/core';
import { Router }       from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { AuthService, SignupRequest } from '../auth.service';

@Component({
  selector:    'app-signup',
  standalone:  true,
  imports:    [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls:   ['./signup.component.scss']
})
export class SignupComponent {
  name         = '';
  email        = '';
  password     = '';
  signupFailed = false;
  message      = '';

  constructor(
    private auth:   AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    const payload: SignupRequest = {
      name:     this.name.trim(),
      email:    this.email.trim(),
      password: this.password
    };

    this.auth.signup(payload).subscribe({
      next: () => {
        this.message      = 'Signup successful! Please log in.';
        this.signupFailed = false;
        this.router.navigate(['/login']);
      },
      error: err => {
        this.signupFailed = true;
        this.message      = err.error?.detail || 'Signup failed';
      }
    });
  }
}
