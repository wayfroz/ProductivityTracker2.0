import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }       from './auth/login/login.component';
import { SignupComponent }      from './auth/signup/signup.component';
import { CalendarComponent }    from './calendar/calendar.component';
import { DashboardComponent }   from './home-page/dashboard.component';
import { TasksComponent }       from './tasks/tasks.component';

export const routes: Routes = [
  { path: '',          redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',     component: LoginComponent },
  { path: 'signup',    component: SignupComponent },
  { path: 'calendar',  component: CalendarComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks',     component: TasksComponent },
  { path: '**',        redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
