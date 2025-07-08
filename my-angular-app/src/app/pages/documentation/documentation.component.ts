import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-documentation',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {
  showModal = false;
  modalTitle = '';
  modalContent = '';

  ngOnInit(): void {
    this.initializeMobileMenu();
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

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  showTechniqueDetails(technique: string): void {
    const techniques = {
      'mindfulness': {
        title: 'Mindfulness Meditation',
        content: `
          <h4 class="font-bold text-lg mb-3">What is Mindfulness Meditation?</h4>
          <p class="mb-4">Mindfulness meditation is a practice that involves focusing your attention on the present moment, observing your thoughts, feelings, and sensations without judgment.</p>
          
          <h4 class="font-bold text-lg mb-3">How to Practice:</h4>
          <ol class="list-decimal list-inside space-y-2 mb-4">
            <li>Find a comfortable seated position</li>
            <li>Close your eyes or maintain a soft gaze</li>
            <li>Focus on your natural breath</li>
            <li>When your mind wanders, gently return to your breath</li>
            <li>Practice for 5-20 minutes daily</li>
          </ol>
          
          <h4 class="font-bold text-lg mb-3">Benefits:</h4>
          <ul class="list-disc list-inside space-y-1 mb-4">
            <li>Reduced stress and anxiety</li>
            <li>Improved focus and concentration</li>
            <li>Better emotional regulation</li>
            <li>Enhanced self-awareness</li>
          </ul>
          
          <p class="text-sm text-gray-600">Start with our "Foundations of Mindfulness" course for guided practice.</p>
        `
      },
      'loving-kindness': {
        title: 'Loving-Kindness Meditation',
        content: `
          <h4 class="font-bold text-lg mb-3">What is Loving-Kindness Meditation?</h4>
          <p class="mb-4">Loving-kindness meditation (Metta) is a practice that cultivates compassion and goodwill towards yourself and others.</p>
          
          <h4 class="font-bold text-lg mb-3">How to Practice:</h4>
          <ol class="list-decimal list-inside space-y-2 mb-4">
            <li>Begin by directing love and kindness to yourself</li>
            <li>Extend these feelings to a loved one</li>
            <li>Include a neutral person</li>
            <li>Include someone you have difficulty with</li>
            <li>Finally, extend to all beings everywhere</li>
          </ol>
          
          <h4 class="font-bold text-lg mb-3">Benefits:</h4>
          <ul class="list-disc list-inside space-y-1 mb-4">
            <li>Increased compassion and empathy</li>
            <li>Reduced negative emotions</li>
            <li>Improved relationships</li>
            <li>Greater sense of connection</li>
          </ul>
          
          <p class="text-sm text-gray-600">Try our "Compassion & Connection" course for guided loving-kindness practice.</p>
        `
      },
      'body-scan': {
        title: 'Body Scan Meditation',
        content: `
          <h4 class="font-bold text-lg mb-3">What is Body Scan Meditation?</h4>
          <p class="mb-4">Body scan meditation involves systematically focusing your attention on different parts of your body, observing sensations without judgment.</p>
          
          <h4 class="font-bold text-lg mb-3">How to Practice:</h4>
          <ol class="list-decimal list-inside space-y-2 mb-4">
            <li>Lie down in a comfortable position</li>
            <li>Start with your toes and work up to your head</li>
            <li>Notice sensations in each body part</li>
            <li>Release tension as you scan</li>
            <li>Practice for 10-30 minutes</li>
          </ol>
          
          <h4 class="font-bold text-lg mb-3">Benefits:</h4>
          <ul class="list-disc list-inside space-y-1 mb-4">
            <li>Reduced physical tension</li>
            <li>Better body awareness</li>
            <li>Improved sleep quality</li>
            <li>Stress relief</li>
          </ul>
          
          <p class="text-sm text-gray-600">Explore our "Body Awareness" course for guided body scan sessions.</p>
        `
      },
      'breath-awareness': {
        title: 'Breath Awareness Meditation',
        content: `
          <h4 class="font-bold text-lg mb-3">What is Breath Awareness?</h4>
          <p class="mb-4">Breath awareness meditation uses the natural rhythm of your breathing as an anchor for your attention.</p>
          
          <h4 class="font-bold text-lg mb-3">How to Practice:</h4>
          <ol class="list-decimal list-inside space-y-2 mb-4">
            <li>Sit comfortably with your back straight</li>
            <li>Focus on the sensation of your breath</li>
            <li>Notice the inhale and exhale</li>
            <li>Count breaths if helpful (1-10, then restart)</li>
            <li>Return to breath when mind wanders</li>
          </ol>
          
          <h4 class="font-bold text-lg mb-3">Benefits:</h4>
          <ul class="list-disc list-inside space-y-1 mb-4">
            <li>Improved concentration</li>
            <li>Calmed nervous system</li>
            <li>Better stress management</li>
            <li>Enhanced mindfulness</li>
          </ul>
          
          <p class="text-sm text-gray-600">Start with our "Breath Foundation" course for guided breath awareness practice.</p>
        `
      }
    };

    const techniqueData = techniques[technique as keyof typeof techniques];
    if (techniqueData) {
      this.modalTitle = techniqueData.title;
      this.modalContent = techniqueData.content;
      this.showModal = true;
    }
  }

  showAdvancedTopic(topic: string): void {
    const topics = {
      'routine': {
        title: 'Creating a Meditation Routine',
        content: `
          <h4 class="font-bold text-lg mb-3">Building a Sustainable Practice</h4>
          <p class="mb-4">A consistent meditation routine is more valuable than long, sporadic sessions. Here's how to build one:</p>
          
          <h4 class="font-bold text-lg mb-3">Step 1: Start Small</h4>
          <p class="mb-4">Begin with just 5 minutes daily. It's better to meditate for 5 minutes every day than 30 minutes once a week.</p>
          
          <h4 class="font-bold text-lg mb-3">Step 2: Choose a Consistent Time</h4>
          <p class="mb-4">Pick a time that works for your schedule - morning, lunch break, or evening. Consistency helps build the habit.</p>
          
          <h4 class="font-bold text-lg mb-3">Step 3: Create a Dedicated Space</h4>
          <p class="mb-4">Find a quiet corner where you can meditate regularly. Even a small space can become your meditation sanctuary.</p>
          
          <h4 class="font-bold text-lg mb-3">Step 4: Gradually Increase Duration</h4>
          <p class="mb-4">Once 5 minutes feels comfortable, gradually increase to 10, then 15, then 20 minutes.</p>
          
          <h4 class="font-bold text-lg mb-3">Step 5: Track Your Progress</h4>
          <p class="mb-4">Use our platform's tracking features to monitor your consistency and celebrate your progress.</p>
        `
      },
      'goals': {
        title: 'Meditation for Specific Goals',
        content: `
          <h4 class="font-bold text-lg mb-3">Targeted Meditation Practices</h4>
          <p class="mb-4">Different meditation techniques can help achieve specific goals:</p>
          
          <h4 class="font-bold text-lg mb-3">For Stress Relief:</h4>
          <ul class="list-disc list-inside space-y-1 mb-4">
            <li>Mindfulness meditation</li>
            <li>Progressive muscle relaxation</li>
            <li>Loving-kindness meditation</li>
          </ul>
          
          <h4 class="font-bold text-lg mb-3">For Better Focus:</h4>
          <ul class="list-disc list-inside space-y-1 mb-4">
            <li>Breath awareness meditation</li>
            <li>Concentration meditation</li>
            <li>Body scan meditation</li>
          </ul>
          
          <h4 class="font-bold text-lg mb-3">For Emotional Balance:</h4>
          <ul class="list-disc list-inside space-y-1 mb-4">
            <li>Loving-kindness meditation</li>
            <li>Mindfulness meditation</li>
            <li>Compassion meditation</li>
          </ul>
          
          <h4 class="font-bold text-lg mb-3">For Better Sleep:</h4>
          <ul class="list-disc list-inside space-y-1 mb-4">
            <li>Body scan meditation</li>
            <li>Progressive relaxation</li>
            <li>Breath awareness</li>
          </ul>
        `
      },
      'integration': {
        title: 'Integrating Meditation into Daily Life',
        content: `
          <h4 class="font-bold text-lg mb-3">Mindfulness in Everyday Activities</h4>
          <p class="mb-4">Meditation doesn't have to be limited to formal practice. Here are ways to bring mindfulness into daily life:</p>
          
          <h4 class="font-bold text-lg mb-3">Mindful Eating:</h4>
          <p class="mb-4">Pay attention to the taste, texture, and smell of your food. Eat slowly and savor each bite.</p>
          
          <h4 class="font-bold text-lg mb-3">Mindful Walking:</h4>
          <p class="mb-4">Notice the sensation of your feet touching the ground, the rhythm of your steps, and your surroundings.</p>
          
          <h4 class="font-bold text-lg mb-3">Mindful Communication:</h4>
          <p class="mb-4">Listen fully to others without planning your response. Be present in conversations.</p>
          
          <h4 class="font-bold text-lg mb-3">Mindful Breaks:</h4>
          <p class="mb-4">Take short mindful breaks throughout the day - just 1-2 minutes to breathe and center yourself.</p>
          
          <h4 class="font-bold text-lg mb-3">Mindful Technology Use:</h4>
          <p class="mb-4">Be intentional about when and how you use technology. Take breaks from screens regularly.</p>
        `
      },
      'science': {
        title: 'Understanding Meditation Science',
        content: `
          <h4 class="font-bold text-lg mb-3">The Science Behind Meditation</h4>
          <p class="mb-4">Research has shown that regular meditation practice can lead to measurable changes in the brain and body:</p>
          
          <h4 class="font-bold text-lg mb-3">Brain Changes:</h4>
          <ul class="list-disc list-inside space-y-1 mb-4">
            <li>Increased gray matter in areas associated with learning and memory</li>
            <li>Reduced activity in the amygdala (stress response center)</li>
            <li>Enhanced connectivity in attention networks</li>
            <li>Thickened prefrontal cortex (decision-making)</li>
          </ul>
          
          <h4 class="font-bold text-lg mb-3">Physical Benefits:</h4>
          <ul class="list-disc list-inside space-y-1 mb-4">
            <li>Lower blood pressure and heart rate</li>
            <li>Reduced cortisol levels (stress hormone)</li>
            <li>Improved immune function</li>
            <li>Better sleep quality</li>
          </ul>
          
          <h4 class="font-bold text-lg mb-3">Mental Health Benefits:</h4>
          <ul class="list-disc list-inside space-y-1 mb-4">
            <li>Reduced symptoms of anxiety and depression</li>
            <li>Improved emotional regulation</li>
            <li>Enhanced focus and attention</li>
            <li>Greater sense of well-being</li>
          </ul>
          
          <p class="text-sm text-gray-600">These benefits typically become noticeable after 8-12 weeks of consistent practice.</p>
        `
      }
    };

    const topicData = topics[topic as keyof typeof topics];
    if (topicData) {
      this.modalTitle = topicData.title;
      this.modalContent = topicData.content;
      this.showModal = true;
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.modalTitle = '';
    this.modalContent = '';
  }
} 