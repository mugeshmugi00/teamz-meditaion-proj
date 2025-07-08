<<<<<<< Updated upstream
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

interface User {
  name: string;
  email: string;
  createdAt: string;
}
=======
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
>>>>>>> Stashed changes

@Component({
  selector: 'app-user-home',
  standalone: true,
<<<<<<< Updated upstream
  imports: [CommonModule], // Remove RouterLink if not used
=======
  imports: [CommonModule, RouterModule, FooterComponent],
>>>>>>> Stashed changes
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
    const meditationTime = (document.getElementById('meditation-time') as HTMLSelectElement).value;
    this.router.navigate(['/session-start'], { queryParams: { time: meditationTime } });
  }

  onLogout(): void {
    this.user = null;
    this.router.navigate(['/login']);
  }
}