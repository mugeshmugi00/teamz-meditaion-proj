import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-start',
  templateUrl: './session-start.component.html',
  styleUrl: './session-start.component.css',
  imports: [CommonModule]
})
export class SessionStartComponent implements OnInit, OnDestroy {
  timeInSeconds: number = 0;
  displayTime: string = '00:00';
  isRunning: boolean = false;
  isPaused: boolean = false;
  private timer: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const minutes = parseInt(params['time'] || '5', 10);
      this.timeInSeconds = minutes * 60;
      this.updateDisplayTime();
    });
  }

  startTimer() {
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

  pauseTimer() {
    if (this.isRunning) {
      clearInterval(this.timer);
      this.isRunning = false;
      this.isPaused = true;
    }
  }

  resumeTimer() {
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

  stopTimer() {
    clearInterval(this.timer);
    this.isRunning = false;
    this.isPaused = false;
    this.router.navigate(['/user-home']);
  }

  goBack() {
    this.router.navigate(['/user-home']);
  }

  private updateDisplayTime() {
    const minutes = Math.floor(this.timeInSeconds / 60);
    const seconds = this.timeInSeconds % 60;
    this.displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}