import { RouterModule, Routes } from "@angular/router";
import { CalendarComponent } from "./calendar/calendar.component";
import { DashboardComponent } from "./home-page/dashboard.component";
import { NgModule } from "@angular/core";
import { TasksComponent } from "./Tasks/Tasks.component";

export const routes: Routes = [
    { path: 'calendar', component: CalendarComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'Tasks', component: TasksComponent},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard' },
    { path: 'tasks', component: TasksComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
  