import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-session-start',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './session-start.component.html',
  styleUrls: ['./session-start.component.css']
})
export class SessionStartComponent implements OnInit, OnDestroy {
  timeInSeconds: number = 0;
  displayTime: string = '00:00';
  isRunning: boolean = false;
  isPaused: boolean = false;
  private timer: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const minutes = parseInt(params['time'] || '5', 10);
      this.timeInSeconds = minutes * 60;
      this.updateDisplayTime();
    });
  }

  startTimer(): void {
    if (!this.isRunning && !this.isPaused) {
      this.isRunning = true;
      this.timer = setInterval(() => {
        if (this.timeInSeconds > 0) {
          this.timeInSeconds--;
          this.updateDisplayTime();
        } else {
          this.stopTimer();
          this.router.navigate(['/user-home']);
        }
      }, 1000);
    }
  }

  pauseTimer(): void {
    if (this.isRunning) {
      clearInterval(this.timer);
      this.isRunning = false;
      this.isPaused = true;
    }
  }

  resumeTimer(): void {
    if (this.isPaused) {
      this.isRunning = true;
      this.isPaused = false;
      this.timer = setInterval(() => {
        if (this.timeInSeconds > 0) {
          this.timeInSeconds--;
          this.updateDisplayTime();
        } else {
          this.stopTimer();
          this.router.navigate(['/user-home']);
        }
      }, 1000);
    }
  }

  stopTimer(): void {
    clearInterval(this.timer);
    this.isRunning = false;
    this.isPaused = false;
    this.router.navigate(['/user-home']);
  }

  goBack(): void {
    this.router.navigate(['/user-home']);
  }

  private updateDisplayTime(): void {
    const minutes = Math.floor(this.timeInSeconds / 60);
    const seconds = this.timeInSeconds % 60;
    this.displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}