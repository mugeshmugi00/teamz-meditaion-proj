import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

interface User {
  name: string;
  email: string;
  createdAt: string;
}

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent], // Single imports array
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  user: User | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state && 'user' in navigation.extras.state) {
      this.user = navigation.extras.state['user'] as User;
    } else {
      this.router.navigate(['/login']);
    }
  }

  onStart(): void {
    const meditationTimeElement = document.getElementById('meditation-time') as HTMLSelectElement | null;
    if (meditationTimeElement) {
      const meditationTime = meditationTimeElement.value;
      this.router.navigate(['/session-start'], { queryParams: { time: meditationTime } });
    } else {
      console.error('Meditation time select element not found');
      // Optionally redirect or handle the error
      this.router.navigate(['/error']); // Example fallback
    }
  }

  onLogout(): void {
    this.user = null;
    this.router.navigate(['/login']);
  }
}