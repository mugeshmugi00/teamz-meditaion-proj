import { Routes } from '@angular/router';
import { IntroComponent } from './pages/intro/intro.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SessionStartComponent } from './pages/session-start/session-start.component';
<<<<<<< Updated upstream
import { PoemComponent } from './pages/poem/poem.component';
=======
import { SupportComponent } from './pages/support/support.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { ExploreCoursesComponent } from './pages/explore-courses/explore-courses.component';
>>>>>>> Stashed changes


export const routes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'intro', component: IntroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'support', component: SupportComponent },
  { path: 'documentation', component: DocumentationComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'user-home', component: UserHomeComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'session-start', component: SessionStartComponent },
<<<<<<< Updated upstream
  { path: 'app-poem', component: PoemComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
=======
  { path: 'explore-courses', component: ExploreCoursesComponent },
  {
    path: 'claim-discount',
    loadComponent: () => import('./pages/claim-discount/claim-discount.component').then(m => m.ClaimDiscountComponent)
  },
  {
    path: 'learn-more',
    loadComponent: () => import('./pages/learn-more/learn-more.component').then(m => m.LearnMoreComponent)
  },
  {
    path: 'community',
    loadComponent: () => import('./pages/community/community.component').then(m => m.CommunityComponent)
  },
  {
    path: 'events',
    loadComponent: () => import('./pages/events/events.component').then(m => m.EventsComponent)
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'cookies',
    loadComponent: () => import('./pages/cookies/cookies.component').then(m => m.CookiesComponent)
  },
  {
    path: 'accessibility',
    loadComponent: () => import('./pages/accessibility/accessibility.component').then(m => m.AccessibilityComponent)
  },
  { path: '**', redirectTo: '' } 
>>>>>>> Stashed changes
];
