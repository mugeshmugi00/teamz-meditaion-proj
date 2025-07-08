import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-claim-discount',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 py-16 px-4">
      <div class="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full text-center">
        <h1 class="text-3xl font-bold mb-4 gradient-text">Claim Your Discount</h1>
        <p class="mb-6 text-gray-700">Sign up below to receive 50% off your first month of premium membership!</p>
        <form *ngIf="!submitted" (ngSubmit)="submitForm()" #discountForm="ngForm">
          <input type="text" name="name" [(ngModel)]="name" required placeholder="Your Name" class="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="email" name="email" [(ngModel)]="email" required placeholder="Your Email" class="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />
          <button type="submit" [disabled]="!discountForm.form.valid" class="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-md hover:from-purple-500 hover:to-blue-500 transition">Claim Discount</button>
        </form>
        <div *ngIf="submitted" class="mt-6">
          <div class="text-green-600 text-xl font-bold mb-2">Success!</div>
          <div class="text-gray-700">Your discount has been claimed. Check your email for details.</div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./claim-discount.component.css']
})
export class ClaimDiscountComponent {
  name = '';
  email = '';
  submitted = false;

  submitForm() {
    this.submitted = true;
  }
} 