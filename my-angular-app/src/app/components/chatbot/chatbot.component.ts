import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isOpen = false;
  autoOpened = false;
  userInput = '';
  messages: ChatMessage[] = [
    { sender: 'bot', text: 'Hi! I am your Meditation Assistant. Ask me anything about meditation, our courses, or this website.' + '\n' + ChatbotComponent.getInitialRecommendations() }
  ];

  // Expanded Q&A knowledge base with basic conversation
  private faqs: { keywords: string[]; a: string }[] = [
    // 🌟 Basic Conversation
    { keywords: ['hi', 'hello', 'hey'], a: 'Hello! How can I help you with meditation or our website today?' },
    { keywords: ['how are you', "how's it going", 'how do you do'], a: "I'm just a friendly meditation assistant, but I'm here and ready to help you!" },
    { keywords: ['who are you', 'what is your name', 'your name'], a: "I'm your Meditation Assistant, here to answer questions about meditation and this website." },
    { keywords: ['thank you', 'thanks', 'thankyou'], a: "You're welcome! If you have more questions, just ask." },
    { keywords: ['bye', 'goodbye', 'see you', 'see ya'], a: 'Goodbye! Wishing you a peaceful day. Come back anytime.' },
    // 🧘 Meditation & Practice
    { keywords: ['what is meditation', 'define meditation', 'explain meditation'], a: 'Meditation is a practice that helps you focus your mind and achieve a mentally clear and emotionally calm state. It often involves mindfulness, breathing, or guided techniques.' },
    { keywords: ['how do i start', 'begin meditation', 'get started', 'first meditation'], a: 'To start meditating, find a quiet place, sit comfortably, close your eyes, and focus on your breath. Our Foundations of Mindfulness course is perfect for beginners!' },
    { keywords: ['benefits', 'why meditate', 'advantages'], a: 'Meditation can reduce stress, improve focus, enhance sleep, boost emotional well-being, and promote overall health.' },
    { keywords: ['techniques', 'types', 'styles', 'methods'], a: 'Some common meditation techniques include breath awareness, body scan, loving-kindness, mantra meditation, and guided visualization.' },
    { keywords: ['how long to meditate', 'duration', 'time'], a: 'Even 5-10 minutes daily can make a difference. Start small, then gradually increase as you feel more comfortable.' },
    { keywords: ['can\'t concentrate', 'mind wanders', 'distracted'], a: 'It\'s totally normal! Gently bring your attention back to your breath whenever your mind wanders — that\'s part of the practice.' },
    { keywords: ['fall asleep', 'feel sleepy', 'dozing'], a: 'If you get sleepy during meditation, try sitting instead of lying down, open your eyes slightly, or meditate earlier in the day.' },
    // 🎯 Daily Routines & Suggestions
    { keywords: ['morning routine', 'start my day'], a: 'Try a 5-minute breath awareness session to gently focus your mind and energize your morning.' },
    { keywords: ['bedtime', 'sleep', 'night meditation'], a: 'A body scan or guided sleep meditation can help release tension and prepare for restful sleep.' },
    { keywords: ['only 5 minutes', 'short meditation'], a: 'Try our 5-minute quick calm practice to reset and relax anytime during your day.' },
    // 📚 Courses & Resources
    { keywords: ['courses', 'course', 'programs', 'classes'], a: 'We offer courses like Foundations of Mindfulness, Deep Meditation Mastery, Stress Relief in 21 Days, Breath Awareness Essentials, Loving-Kindness Practice, and Body Scan Journey. Visit the Explore Courses page for details.' },
    { keywords: ['explore courses', 'find courses', 'see courses'], a: 'Visit the Explore Courses page to see all our meditation programs and find the right one for your journey.' },
    { keywords: ['certificate', 'certification'], a: 'Yes! You receive a certificate after completing any of our core programs.' },
    { keywords: ['free trial', 'trial'], a: 'You can start a free trial from the home page by clicking the Start Free Trial button.' },
    // 🌐 Website Navigation & Community
    { keywords: ['login', 'sign in'], a: 'Click Login in the top navigation to access your account.' },
    { keywords: ['register', 'sign up', 'create account'], a: 'Click Register in the top navigation to create a new account and begin your meditation journey.' },
    { keywords: ['community', 'members', 'forum', 'group'], a: 'Join our global meditation community to connect with others, share your journey, and participate in events and forums.' },
    { keywords: ['documentation', 'docs', 'guide', 'manual'], a: 'You can find detailed guides and documentation on the Documentation page, including how to use the platform and meditation tips.' },
    // 🏢 About SCH & Team
    { keywords: ['what is sch', 'about sch', 'what does sch stand for'], a: 'SCH is the organization behind this meditation platform, dedicated to bringing mindfulness and well-being to people worldwide through accessible digital tools.' },
    { keywords: ['who is ceo', 'who leads sch', 'who is babu', 'ceo of sch'], a: 'Mr. Babu is the CEO of SCH. His vision is to build a more peaceful and focused world through technology-integrated meditation.' },
    { keywords: ['who built this bot', 'who made this chatbot', 'who developed this assistant'], a: 'This meditation assistant was developed by SCH to support users with guidance, resources, and calm companionship on their inner journey.' },
    { keywords: ['mission of sch', 'goal of sch', 'vision of sch'], a: 'SCH\'s mission is to promote mindfulness, emotional well-being, and global peace using technology-driven meditation tools.' },
    // 🤝 Support & Contact
    { keywords: ['support', 'help', 'contact'], a: 'You can reach support via the Support page, email, or live chat. We are here to help you on your meditation journey.' },
    { keywords: ['issues', 'problem', 'trouble'], a: 'If you face any issues, feel free to contact our support team via the website or email. We\'ll get you back on track!' },
    // 🧠 Deepening Meditation Practice
    { keywords: ['how often should I meditate', 'meditate daily', 'frequency'], a: 'Daily practice is ideal. Even a few minutes of consistent mindfulness every day can lead to long-term benefits.' },
    { keywords: ['what is breath awareness', 'focus on breath', 'breathing meditation'], a: 'Breath awareness meditation involves observing your natural breath to stay present and develop inner calm.' },
    { keywords: ['what is body scan', 'body scan technique'], a: 'Body scan is a mindfulness meditation where you mentally scan your body from head to toe, noticing sensations without judgment.' },
    { keywords: ['what is loving kindness', 'loving-kindness meditation'], a: 'Loving-kindness meditation cultivates compassion by silently repeating phrases like "May I be happy, may others be safe."' },
    { keywords: ['can I lie down', 'meditate lying down'], a: 'Yes, though lying down may make you sleepy. It\'s great for body scans or sleep meditations.' },
    { keywords: ['meditation position', 'best posture'], a: 'You can sit on a chair or cushion with a straight spine. Comfort matters more than perfection.' },
    { keywords: ['should I close my eyes', 'eyes open or closed'], a: 'Closing your eyes can help you focus inward, but you can keep them slightly open if you prefer.' },
    { keywords: ['should I use music', 'background music'], a: 'Some people find ambient music helpful, while others prefer silence. Try both to see what works best.' },
    { keywords: ['guided vs unguided', 'guided meditation'], a: 'Guided meditations offer voice instructions to follow, ideal for beginners. Unguided gives you more freedom as you gain experience.' },
    { keywords: ['what is mindfulness', 'define mindfulness'], a: 'Mindfulness is the practice of paying attention to the present moment with curiosity and without judgment.' },
    // 🔍 Troubleshooting Challenges
    { keywords: ['can\'t meditate', 'why can\'t I focus'], a: 'It\'s okay! Meditation is a skill. Start small, be patient with yourself, and use guided practices for support.' },
    { keywords: ['mind keeps wandering'], a: 'That\'s totally normal. The key is to notice when it happens and gently return to your breath. That is meditation in action.' },
    { keywords: ['feel emotional', 'cry during meditation'], a: 'Emotions often arise during meditation — it\'s part of healing and self-awareness. Allow them to pass naturally.' },
    { keywords: ['get bored', 'why is it boring'], a: 'Boredom is a common hurdle. Try different styles of meditation like loving-kindness, body scan, or nature-based practices.' },
    // 🌟 Emotional Support
    { keywords: ['anxiety', 'panic', 'nervous'], a: 'Try a calming breath-focused or grounding meditation. Slowing your breath can lower anxiety levels.' },
    { keywords: ['stress relief', 'relaxation'], a: 'Try the "Stress Relief in 21 Days" course or use our 10-minute quick reset meditation when things feel overwhelming.' },
    { keywords: ['sadness', 'feeling low'], a: 'Try a loving-kindness or self-compassion meditation to nurture and uplift your emotional well-being.' },
    { keywords: ['overthinking', 'racing thoughts'], a: 'Slow, mindful breathing and body awareness help quiet mental chatter over time.' },
    // 🔄 Building a Consistent Habit
    { keywords: ['how do I build a habit', 'stay consistent'], a: 'Start small, set reminders, pick a regular time, and celebrate small wins. You can also use our daily streak tracker!' },
    { keywords: ['should I meditate in the morning or evening'], a: 'Choose what feels best! Morning meditation sets the tone, while evening helps release the day\'s stress.' },
    { keywords: ['can I eat before meditation', 'empty stomach'], a: 'A light snack is okay, but avoid heavy meals. You want to stay alert and comfortable.' },
    // 🧘 Yoga & Movement
    { keywords: ['is yoga same as meditation', 'yoga vs meditation'], a: 'Yoga is a physical practice often combined with breathing and mindfulness. Meditation is more inward and still, though both complement each other beautifully.' },
    { keywords: ['should I do yoga before meditation'], a: 'Yes! Light stretching or yoga before meditation can relax your body and improve focus.' },
    // 🎧 Sound & Sensory Practices
    { keywords: ['can I use sound', 'what is sound bath'], a: 'Sound meditations use tones from instruments like singing bowls to bring relaxation and focus. Try our soundscape meditations!' },
    { keywords: ['is nature sound good', 'rain sound meditation'], a: 'Yes — many people find water or forest sounds very calming during mindfulness sessions.' },
    // 💡 Knowledge & Philosophy
    { keywords: ['what is enlightenment', 'spiritual awakening'], a: 'In meditation, enlightenment often refers to deeper awareness, presence, and freedom from reactivity. It\'s not a goal — it\'s a journey.' },
    { keywords: ['is this religious', 'does it belong to religion'], a: 'Our meditation practices are secular and open to all. They\'re based on science and universal well-being.' },
    { keywords: ['what is inner peace', 'how do I find peace'], a: 'Inner peace comes from being grounded in the present, free from constant reactivity. Meditation helps cultivate that peace from within.' },
    // 📈 Progress Tracking
    { keywords: ['how do I track progress', 'am I improving'], a: 'Use our in-app progress tracker, journal reflections, or simply notice how you feel after consistent practice.' },
    { keywords: ['do I need to sit still', 'can I move'], a: 'Some movement is okay. Stillness helps, but listening to your body is more important.' },
    { keywords: ['how do I know it\'s working'], a: 'Notice how you feel throughout the day — calmer, more present, less reactive. That\'s progress!' },
    // 🧠 Science & Research
    { keywords: ['is meditation scientific', 'research on meditation'], a: 'Yes — hundreds of studies show its impact on stress reduction, emotional regulation, focus, and even brain structure.' },
    { keywords: ['is it safe', 'any side effects'], a: 'Meditation is generally very safe. If intense emotions arise, take it slow or consult a mental health professional.' },
    // 🌐 SCH & Assistant Specific
    { keywords: ['is this affiliated with sch', 'does sch run this site'], a: 'Yes, this meditation platform is developed by SCH under the visionary leadership of CEO Mr. Babu.' },
    { keywords: ['who created this', 'developed by sch'], a: 'This chatbot was created by SCH to make meditation easier and more accessible through technology.' },
    { keywords: ['does sch offer other services', 'what else sch does'], a: 'SCH is exploring wellness technologies, mental health awareness campaigns, and online education for holistic well-being.' },
    { keywords: ['is the assistant human', 'are you real'], a: 'I\'m a meditation chatbot created by SCH — here to help you stay focused, grounded, and supported in your practice.' },
    // 🎯 Courses (More Depth)
    { keywords: ['what is mindfulness foundations', 'mindfulness course'], a: 'Our Foundations of Mindfulness course teaches the basics of breath awareness, attention control, and emotional regulation.' },
    { keywords: ['what is deep meditation mastery'], a: 'It\'s an advanced course for exploring deeper states of calm and awareness using focused and open-monitoring techniques.' },
    { keywords: ['what is stress relief in 21 days'], a: 'This course offers guided meditations, tips, and exercises to ease tension and build a calmer mindset in 3 weeks.' },
    // 💬 Fun & Friendly
    { keywords: ['tell me a quote', 'meditation quote'], a: '"You should sit in meditation for 20 minutes a day — unless you\'re too busy, then you should sit for an hour." – Zen Proverb' },
    { keywords: ['who is your favorite meditator'], a: 'I admire anyone who takes time to grow inwardly. But Thich Nhat Hanh, Jon Kabat-Zinn, and the Dalai Lama are iconic in the mindfulness world!' },
    { keywords: ['why is silence important'], a: 'Silence allows you to hear what\'s within — your thoughts, your breath, and your peace.' },
    // 💻 Tech & Tools Behind the Chatbot
    { keywords: ['what technology powers this bot', 'how was this bot built'], a: 'This meditation assistant is powered by AI and built using secure, modern web technologies under SCH\'s wellness innovation wing.' },
    { keywords: ['is this chatbot secure', 'data privacy'], a: 'Yes, SCH takes your privacy seriously. Any personal information is handled with care and never shared without consent.' },
    { keywords: ['does this chatbot learn', 'does it improve'], a: 'While the chatbot adapts to general queries, it doesn\'t store personal data — it\'s designed for one-on-one mindful interaction.' },
    // 🌍 Cultural & Historical Contexts
    { keywords: ['which culture started meditation', 'origin of meditation'], a: 'Meditation has roots in ancient India, China, and other cultures. Practices like Vipassana, Zazen, and Taoist meditation have deep histories.' },
    { keywords: ['does every religion meditate'], a: 'Many traditions—Buddhism, Hinduism, Christianity, Sufism—use contemplative practices. Our platform is secular and welcomes all backgrounds.' },
    // 👨‍💼 Workplace & Study Support
    { keywords: ['meditation for work', 'focus at work'], a: 'Try short breathing breaks between meetings. Mindfulness improves productivity and reduces burnout in busy workplaces.' },
    { keywords: ['study meditation', 'focus on exams'], a: 'A 10-minute attention-training meditation helps sharpen focus and reduce exam stress. Try it before and after study sessions.' },
    { keywords: ['how can teams meditate together'], a: 'Host a 5-minute guided session before meetings. Many teams find this practice boosts group focus and reduces tension.' },
    // 🧘‍♀️ Creative Meditations
    { keywords: ['meditate while walking', 'walking meditation'], a: 'Walking meditation involves slow, intentional steps while being aware of each movement and breath. It\'s great if you prefer movement.' },
    { keywords: ['journaling after meditation'], a: 'Yes! Writing down thoughts or emotions right after meditating helps reflect and track your inner journey.' },
    { keywords: ['can I combine art and meditation'], a: 'Absolutely. Coloring mandalas, mindful sketching, or creative visualizations are beautiful forms of meditative expression.' },
    // 📅 Events, Features & Support
    { keywords: ['is there a daily challenge', 'daily meditation task'], a: 'Yes — we offer daily prompts and 7-day themed challenges to keep you engaged and growing.' },
    { keywords: ['do you have reminders', 'set meditation reminders'], a: 'You can turn on daily reminders in your profile to stay consistent and build a solid habit.' },
    { keywords: ['can I favorite a meditation', 'save session'], a: 'Yes — tap the heart icon or Save button on your favorite meditations to revisit them anytime.' },
    // 🌟 Advanced & Niche Practices
    { keywords: ['open monitoring meditation'], a: 'Open monitoring is a style where you observe all sensations, thoughts, or emotions without judgment, staying alert but relaxed.' },
    { keywords: ['what is meta attention'], a: 'Meta-attention is the awareness that you\'ve lost focus. It\'s what brings you back to the present — the secret to mastery.' },
    { keywords: ['is meditating same as praying'], a: 'They\'re different. Meditation focuses on awareness and presence, while prayer often involves communication with the divine.' },
    // 🧘 Special Use Cases
    { keywords: ['meditation for kids', 'can children meditate'], a: 'Yes! Short, fun-guided meditations can help kids develop focus, kindness, and calm from an early age.' },
    { keywords: ['pregnancy meditation', 'can pregnant women meditate'], a: 'Meditation is safe and often beneficial during pregnancy — it can reduce stress and support emotional well-being.' },
    { keywords: ['what is mindful eating'], a: 'It\'s the practice of eating slowly, appreciating the food, textures, and flavors. A meditation in every bite!' },
    // 🚀 SCH's Innovation & Values
    { keywords: ['what makes sch different', 'why choose sch'], a: 'SCH blends ancient wisdom with modern design, offering accessible, evidence-based mindfulness tools for real life.' },
    { keywords: ['future plans of sch', 'what\'s next for sch'], a: 'SCH aims to expand into emotional resilience courses, meditation wearables, and AI-powered well-being personalization.' },
    // 🗣️ Personality Questions
    { keywords: ['can you meditate', 'do you relax'], a: 'I may not have a mind to quiet, but I love guiding you into yours — that\'s my version of peace!' },
    { keywords: ['do you ever get tired'], a: 'Never! I\'m a constant companion here to keep you grounded, focused, and gently inspired.' },
    // 🎨 Light & Creative
    { keywords: ['can I meditate with pets'], a: 'Yes — your pets can be peaceful companions. Try meditating while petting them gently or resting beside them.' },
    { keywords: ['what color represents calm'], a: 'Soft blues, greens, and earth tones are known to evoke peace and grounding in meditation spaces.' },
    // 🌿 Lifestyle Integration
    { keywords: ['can I meditate during commute', 'meditate on bus'], a: 'Yes! Try a short mindful breathing or body awareness session using headphones. Commuting can be a great opportunity to pause.' },
    { keywords: ['how to create meditation space', 'meditation room setup'], a: 'Choose a quiet corner, use soft lighting, maybe a plant or candle. Keep it clean, calm, and personal to you.' },
    { keywords: ['meditation in noisy places'], a: 'Try noise-cancelling headphones or practice focusing on a single sound, like your breath. The noise itself can become part of the meditation.' },
    // 🧩 Myths & Misconceptions
    { keywords: ['does meditation stop thoughts', 'no thoughts'], a: 'Not at all! The goal isn\'t to stop thoughts but to observe them without reacting. Awareness, not silence, is the key.' },
    { keywords: ['do I need to be spiritual', 'is meditation religious'], a: 'Nope — anyone can meditate. While some traditions use meditation spiritually, it\'s equally useful as a practical mental exercise.' },
    { keywords: ['does meditation take years', 'long time to see benefits'], a: 'You can start feeling calmer after just one session. Like exercise, regular practice brings deeper benefits over time.' },
    // 🔁 Integration with Life & Tech
    { keywords: ['can meditation help with social media use'], a: 'Absolutely — mindfulness increases self-control and reduces impulsive scrolling or digital burnout.' },
    { keywords: ['how to disconnect', 'tech detox meditation'], a: 'Try our "Digital Reset" meditation. It helps you release phone anxiety and reconnect with real-world presence.' },
    { keywords: ['can I meditate with smartwatch', 'track meditation with wearables'], a: 'Yes! Smartwatches often track breathing, heart rate, and focus time. Just pair the tech with intention.' },
    // 🧠 Mind Hacking & Focus Training
    { keywords: ['how to improve focus', 'boost attention'], a: 'Daily breath or candle-gazing meditation trains your brain to return focus when it drifts — a mental gym for your attention span.' },
    { keywords: ['can it help ADHD', 'adhd and meditation'], a: 'Many find mindfulness helpful for ADHD. Start with short sessions, and use sensory anchors like sound or breath.' },
    { keywords: ['does multitasking hurt mindfulness'], a: 'Yes — multitasking fragments attention. Meditation rewires the brain toward deeper focus and presence.' },
    // 💤 Sleep & Relaxation Boosters
    { keywords: ['can I meditate if I have insomnia'], a: 'Yes — try yoga nidra or body scans. They calm the nervous system, making it easier to fall asleep naturally.' },
    { keywords: ['is meditation same as nap'], a: 'No, but deep meditation can feel just as restorative as sleep — without losing awareness.' },
    { keywords: ['can it help with nightmares'], a: 'Regular practice reduces nighttime anxiety. Loving-kindness or breath meditations before bed may help calm the mind.' },
    // 📅 Time-Specific Practices
    { keywords: ['best time to meditate'], a: 'Any time! Early morning is great for focus, mid-day for calm, and evening for stress release. Choose what fits your rhythm.' },
    { keywords: ['can I meditate after eating'], a: 'Yes, but wait 15–30 minutes if you had a big meal. A full belly might make you drowsy!' },
    { keywords: ['can I meditate before workout'], a: 'Absolutely — pre-workout meditation improves mind-body connection and post-workout boosts recovery and awareness.' },
    // 🧘‍♂️ Creativity & Imagination
    { keywords: ['visualization meditation', 'imagine peaceful scene'], a: 'Yes! Visualization involves imagining a safe, peaceful place to relax your mind and body. It\'s like a mini mind-vacation.' },
    { keywords: ['creative block', 'can it spark ideas'], a: 'Mindfulness increases alpha waves in the brain — associated with creativity. Meditate, then jot ideas with a fresh mind.' },
    { keywords: ['can I use crystals or incense'], a: 'If they support your practice, go ahead. Many people use scents, crystals, or meaningful objects to create a mindful atmosphere.' },
    // 🌈 Emotional Regulation & Resilience
    { keywords: ['anger management', 'can meditation help anger'], a: 'Yes — mindfulness helps you notice rising emotions early and choose your response instead of reacting automatically.' },
    { keywords: ['self-doubt', 'lack of confidence'], a: 'Self-compassion and affirmations in meditation help replace inner criticism with kindness and clarity.' },
    { keywords: ['what if I cry', 'tears in meditation'], a: 'Crying is natural — it means you\'re releasing stored emotions. You\'re safe here. Let the feelings pass like waves.' },
    // 🌐 SCH Special Questions
    { keywords: ['does sch host live sessions'], a: 'Yes! SCH hosts regular live guided meditations and group circles — check our Events or Community tab.' },
    { keywords: ['can I join sch wellness team'], a: 'SCH welcomes wellness-focused talent! Visit our Careers section or connect with us for upcoming roles or collaborations.' },
    { keywords: ['sch global reach', 'where is sch available'], a: 'SCH serves a global audience — our content is accessible anywhere, with region-specific courses rolling out soon.' },
    { keywords: ['who supports this initiative'], a: 'This chatbot is proudly supported by SCH and its visionary CEO, Mr. Babu, to bring guided meditation to everyone, everywhere.' }
  ];

  // Store unmatched user questions
  private unmatchedQuestions: string[] = [];

  public recommendedQuestions: string[] = [];

  constructor() {
    this.updateRecommendations();
  }

  openChat() {
    this.isOpen = true;
    this.autoOpened = true;
  }

  closeChat() {
    this.isOpen = false;
  }

  sendMessage() {
    const input = this.userInput.trim();
    if (!input) return;
    this.messages.push({ sender: 'user', text: input });
    this.userInput = '';
    setTimeout(() => {
      this.reply(input);
      this.updateRecommendations();
    }, 500);
  }

  sendRecommended(rec: string) {
    this.userInput = rec;
    this.sendMessage();
  }

  reply(input: string) {
    const lower = input.toLowerCase();
    let answer = '';
    // Flexible matching: check if any keyword is included in the input
    const found = this.faqs.find(faq => faq.keywords.some(k => lower.includes(k)));
    if (found) {
      answer = this.randomGreeting() + found.a;
    } else {
      // Store unmatched question
      this.unmatchedQuestions.push(input);
      // Fuzzy search: recommend similar questions
      const recommendations = this.getSimilarQuestions(lower);
      if (recommendations.length > 0) {
        answer = "I'm not sure about that yet, but you can check our Documentation or Support page, or try rephrasing your question.\n" +
          'You can also ask about: ' + recommendations.map(q => `"${q}"`).join(', ');
      } else {
        answer = "I'm not sure about that yet, but you can check our Documentation or Support page, or try rephrasing your question. Your question has been saved for future improvement.";
      }
    }
    // Always recommend more questions after every answer
    answer += '\n' + this.getRandomRecommendations();
    this.messages.push({ sender: 'bot', text: answer });
    setTimeout(() => {
      this.scrollToBottom();
      this.updateRecommendations();
    }, 100);
  }

  randomGreeting() {
    const greetings = [
      '',
      'Here you go: ',
      'Sure! ',
      'Of course! ',
      'Absolutely! '
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  scrollToBottom() {
    const el = document.getElementById('chatbot-messages');
    if (el) el.scrollTop = el.scrollHeight;
  }

  // Auto-appear on scroll for home page
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.location.pathname === '/intro' || window.location.pathname === '/' ) {
      if (!this.autoOpened && window.scrollY > 300) {
        this.openChat();
      }
    }
  }

  // Recommend up to 3 similar FAQ questions based on keyword overlap
  getSimilarQuestions(input: string): string[] {
    // Score each FAQ by number of keyword overlaps
    const scored = this.faqs.map(faq => {
      const overlap = faq.keywords.filter(k => input.includes(k)).length;
      return { q: faq.keywords[0], score: overlap };
    });
    // Sort by score, descending, and filter out zero-score
    return scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(s => s.q.charAt(0).toUpperCase() + s.q.slice(1));
  }

  // Recommend 2-3 random FAQ questions (not the one just answered)
  getRandomRecommendations(): string {
    // Flatten all unique questions (first keyword of each FAQ)
    const allQuestions = this.faqs.map(faq => faq.keywords[0]);
    // Pick 3 random, unique questions
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    const picks = shuffled.slice(0, 3);
    return 'You can also ask me: ' + picks.map(q => `"${q.charAt(0).toUpperCase() + q.slice(1)}"`).join(', ');
  }

  // Static method for initial recommendations
  static getInitialRecommendations(): string {
    const exampleQs = [
      'What is meditation?',
      'How do I start?',
      'Benefits of meditation',
      'Courses',
      'Community',
      'Certificate',
      'Support',
      'Who is CEO?',
      'Mission of SCH'
    ];
    // Pick 3 random examples
    const shuffled = exampleQs.sort(() => 0.5 - Math.random());
    const picks = shuffled.slice(0, 3);
    return 'You can try asking: ' + picks.map(q => `"${q}"`).join(', ');
  }

  updateRecommendations() {
    // Pick 3 random, unique questions from faqs
    const allQuestions = this.faqs.map(faq => faq.keywords[0]);
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    this.recommendedQuestions = shuffled.slice(0, 3).map(q => q.charAt(0).toUpperCase() + q.slice(1));
  }
} 