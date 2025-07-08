import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-learn-more',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 py-16 px-4">
      <div class="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full text-center">
        <h1 class="text-3xl font-bold mb-4 gradient-text">Learn More About Premium</h1>
        <p class="mb-6 text-gray-700">Unlock all courses, guided meditations, personalized coaching, and more with our premium membership.</p>
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <div class="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-2 text-blue-700">All Access</h2>
            <p>Unlimited access to every meditation course and resource.</p>
          </div>
          <div class="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-2 text-purple-700">Personalized Coaching</h2>
            <p>Get one-on-one guidance from certified meditation coaches.</p>
          </div>
          <div class="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-2 text-blue-700">Downloadable Resources</h2>
            <p>Guides, audio, and certificates to support your journey.</p>
          </div>
          <div class="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-2 text-purple-700">Community Events</h2>
            <p>Exclusive access to workshops, group meditations, and forums.</p>
          </div>
        </div>
        <a routerLink="/session-start" class="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-md hover:from-purple-500 hover:to-blue-500 transition">Start Your Free Trial</a>
      </div>
    </section>
  `,
  styleUrls: ['./learn-more.component.css']
})
export class LearnMoreComponent {} 