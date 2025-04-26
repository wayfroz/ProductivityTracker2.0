import { RouterModule, Routes } from "@angular/router";
import { CalendarComponent } from "./calendar/calendar.component";
import { DashboardComponent } from "./home-page/dashboard.component";
import { NgModule } from "@angular/core";
import { TasksComponent } from "./tasks/tasks.component";

export const routes: Routes = [
    { path: 'calendar', component: CalendarComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'tasks', component: TasksComponent},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard' },
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
  