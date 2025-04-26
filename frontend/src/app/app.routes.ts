import { RouterModule, Routes } from "@angular/router";
import { CalendarComponent } from "./calendar/calendar.component";
import { DashboardComponent } from "./home-page/dashboard.component";
import { NgModule } from "@angular/core";
import { TasksComponent } from "./tasks/tasks.component";
import { LoginComponent } from "./auth/login/login.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },         
  { path: 'calendar', component: CalendarComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TasksComponent },
  { path: '**', redirectTo: '/login' }                  
];

  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
  