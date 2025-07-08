import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 py-16 px-4">
      <div class="bg-white rounded-lg shadow-xl p-8 max-w-xl w-full text-center">
        <h1 class="text-3xl font-bold mb-4 gradient-text">Privacy Policy</h1>
        <p class="mb-6 text-gray-700">Our privacy policy will be available here soon.</p>
      </div>
    </section>
  `,
  styles: [`.gradient-text {background: linear-gradient(90deg, #5B6EE1, #A259E6);-webkit-background-clip: text;-webkit-text-fill-color: transparent;background-clip: text;text-fill-color: transparent;}`]
})
export class PrivacyPolicyComponent {} 