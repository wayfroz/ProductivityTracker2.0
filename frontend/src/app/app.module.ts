import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient }       from '@angular/common/http';
import { AppComponent }            from './app.component';
import { AppRoutingModule }        from './app.routes';
import { CalendarComponent }       from './calendar/calendar.component';
import { DashboardComponent }      from './home-page/dashboard.component';
import { TasksComponent }          from './tasks/tasks.component';
import { TaskModalComponent }      from './task-modal/task-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DashboardComponent,
    TasksComponent,
    TaskModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
    // HttpClient is provided via provideHttpClient()
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
