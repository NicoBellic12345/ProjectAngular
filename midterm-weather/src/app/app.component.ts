import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    header { padding: 1rem; background: #0d6efd; color: white; }
    nav a { color: white; margin-right: 1rem; }
    .container { padding: 1rem; }
  `]
})
export class AppComponent {
  title = 'Midterm Weather App';
}
