import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

export class LoginComponent {
  password = '';
  loginFailed = false;

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    if (this.auth.login(this.password)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.loginFailed = true;
    }
  }
}
