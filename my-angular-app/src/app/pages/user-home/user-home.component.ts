import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {
  constructor(private router: Router) {}

  onStart() {
    const meditationTime = (document.getElementById('meditation-time') as HTMLSelectElement).value;
    this.router.navigate(['/session-start'], { queryParams: { time: meditationTime } });
  }
}