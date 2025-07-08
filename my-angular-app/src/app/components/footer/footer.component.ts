import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  // Social media links
  socialLinks = {
    twitter: 'https://twitter.com/mindfulmeditations',
    facebook: 'https://facebook.com/mindfulmeditations',
    instagram: 'https://instagram.com/mindfulmeditations',
    linkedin: 'https://linkedin.com/company/mindfulmeditations'
  };

  // Contact information
  contactInfo = {
    address: {
      street: '123 Meditation Street',
      city: 'Mindful City, MC 12345',
      country: 'United States'
    },
    phone: '+1 (800) MEDITATE',
    email: 'support@mindfulmeditations.com',
    hours: 'Mon-Fri: 9AM-6PM EST'
  };

  // Organization information
  organizationInfo = {
    name: 'Mindful Meditations Inc.',
    tagline: 'Empowering minds, one breath at a time.',
    founded: '2020',
    mission: 'To make meditation accessible to everyone through technology and community.'
  };

  // Navigation to external links
  navigateToSocial(platform: string): void {
    const url = this.socialLinks[platform as keyof typeof this.socialLinks];
    if (url) {
      window.open(url, '_blank');
    }
  }

  // Contact actions
  callSupport(): void {
    window.location.href = `tel:${this.contactInfo.phone}`;
  }

  emailSupport(): void {
    window.location.href = `mailto:${this.contactInfo.email}`;
  }

  // Get current year for copyright
  getCurrentYear(): number {
    return this.currentYear;
  }
} 