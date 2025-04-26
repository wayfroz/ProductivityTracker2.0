import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  login(password: string): boolean {
    if (password === 'secret123') {  
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  logout() {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
