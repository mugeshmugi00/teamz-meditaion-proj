import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  openFaqs: boolean[] = [false, false, false, false];

  ngOnInit(): void {
    this.initializeMobileMenu();
  }

  toggleFaq(index: number): void {
    this.openFaqs[index] = !this.openFaqs[index];
  }

  initializeMobileMenu(): void {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  }

  // Support card actions
  browseFAQ(): void {
    console.log('Browse FAQ clicked');
    // Add FAQ navigation logic here
  }

  contactSupport(): void {
    console.log('Contact Support clicked');
    // Add contact support logic here
  }

  startLiveChat(): void {
    console.log('Start Live Chat clicked');
    // Add live chat logic here
  }

  sendEmail(): void {
    window.location.href = 'mailto:support@mindfulmeditations.com';
  }

  callSupport(): void {
    window.location.href = 'tel:+1-800-MEDITATE';
  }
}
