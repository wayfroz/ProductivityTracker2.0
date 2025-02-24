import { Component } from '@angular/core';
import { HomePage } from './home-page/home-page.component';

@Component({
  selector: 'app-root',
  imports: [ HomePage ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
