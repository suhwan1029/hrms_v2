import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var bootstrap: any; // Declare Bootstrap for TypeScript

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  currentDate: string;
  todayDate: string = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // Clock Data
  hourDeg: number = 0;
  minuteDeg: number = 0;
  secondDeg: number = 0;
  digitalTime: string = '';

  articles = [
    {
      date: 'Feb 27th',
      title: "Today's Highlighted Articles",
      news: [
        { headline: 'AI in Drug Discovery...', source: 'Tech News', image: '21.png' },
        { headline: 'AI Protecting Fashion Brands...', source: 'Fashion Journal', image: '22.jpg' }
      ]
    },
    {
      date: 'Feb 26th',
      title: "Today's Highlighted Articles",
      news: [
        { headline: 'Finance Sector AI Boom...', source: 'Financial Times', image: '23.jpg' },
        { headline: 'National AI Computing Center...', source: 'Science Daily', image: '24.jpg' }
      ]
    },
    {
      date: 'Feb 25th',
      title: "Today's Highlighted Articles",
      news: [
        { headline: 'Breakthrough in Quantum Computing...', source: 'Tech World', image: '21.png' },
        { headline: 'AI in Sports Performance Analytics...', source: 'Sports Weekly', image: '22.jpg' }
      ]
    },
    {
      date: 'Feb 24th',
      title: "Today's Highlighted Articles",
      news: [
        { headline: 'Self-Driving Cars: What’s Next?', source: 'Auto Digest', image: '23.jpg' },
        { headline: 'Robotics Transforming Manufacturing...', source: 'Industry Insights', image: '24.jpg' }
      ]
    },
    {
      date: 'Feb 23rd',
      title: "Today's Highlighted Articles",
      news: [
        { headline: '5G and AI: The Future of Connectivity...', source: 'Tech Radar', image: '21.png' },
        { headline: 'Cybersecurity Threats in 2025...', source: 'Security News', image: '22.jpg' }
      ]
    },
    {
      date: 'Feb 22nd',
      title: "Today's Highlighted Articles",
      news: [
        { headline: 'AI-Powered Medical Diagnosis...', source: 'Health Today', image: '23.jpg' },
        { headline: 'Blockchain in Government...', source: 'Economic Review', image: '24.jpg' }
      ]
    },
    {
      date: 'Feb 21st',
      title: "Today's Highlighted Articles",
      news: [
        { headline: 'Future of Space Exploration with AI...', source: 'Science Journal', image: '21.png' },
        { headline: 'AI and Personalized Education...', source: 'Education Weekly', image: '22.jpg' }
      ]
    },
    {
      date: 'Feb 20th',
      title: "Today's Highlighted Articles",
      news: [
        { headline: 'Climate Change Solutions Using AI...', source: 'Green Tech', image: '23.jpg' },
        { headline: 'Smart Cities and AI Integration...', source: 'Urban Planning', image: '24.jpg' }
      ]
    },
    {
      date: 'Feb 19th',
      title: "Today's Highlighted Articles",
      news: [
        { headline: 'Entertainment Industry’s AI Shift...', source: 'Film Magazine', image: '21.png' },
        { headline: 'Music Composition with AI...', source: 'Music Daily', image: '22.jpg' }
      ]
    },
    {
      date: 'Feb 18th',
      title: "Today's Highlighted Articles",
      news: [
        { headline: 'AI Chatbots Revolutionizing Business...', source: 'Business Today', image: '24.jpg' },
        { headline: 'Augmented Reality in Retail...', source: 'Retail Insights', image: '23.jpg' }
      ]
    }
  ];
  
  birthdays = [
    { date: 'Mar 1st', name: 'Ishmeet Singh', image: '1.jpg' }
  ];

  hotTopics = [
    { title: 'AI in Drug Discovery', description: 'Revolutionizing pharmaceuticals with AI' },
    { title: 'Cloud Security', description: 'Ensuring data safety in cloud environments' },
    { title: 'Blockchain for Enterprises', description: 'Decentralized solutions for businesses' },
    { title: 'Future of Remote Work', description: 'How companies are adapting post-pandemic' },
    { title: 'Quantum Computing', description: 'The next leap in computing power' }
  ];

  recentClicks: { title: string; time: string }[] = [];
  favoriteServices = [
    { name: 'Email', icon: 'fas fa-envelope' },
    { name: 'Calendar', icon: 'fas fa-calendar-alt' },
    { name: 'Tasks', icon: 'fas fa-tasks' },
    { name: 'Notes', icon: 'fas fa-sticky-note' }
  ];

  holidays = [
    { name: 'New Year', date: 'Jan 1', month: 1, emoji: '🎉' },
    { name: 'Republic Day', date: 'Jan 26', month: 1, emoji: '🇮🇳' },
    { name: 'Maha Shivratri', date: 'Feb 26', month: 3, emoji: '🕉️' },
    { name: 'Holi', date: 'Mar 25', month: 3, emoji: '🎨' },
    { name: 'Good Friday', date: 'Mar 29', month: 3, emoji: '✝️' },
    { name: 'Eid-ul-Fitr', date: 'Apr 10', month: 4, emoji: '☪️' },
    { name: 'Independence Day', date: 'Aug 15', month: 8, emoji: '🇮🇳' },
    { name: 'Ganesh Chaturthi', date: 'Sep 17', month: 9, emoji: '🐘' },
    { name: 'Dussehra', date: 'Oct 12', month: 10, emoji: '🏹' },
    { name: 'Diwali', date: 'Nov 12', month: 11, emoji: '🪔' },
    { name: 'Christmas', date: 'Dec 25', month: 12, emoji: '🎄' }
  ];

  currentAndNextMonthHolidays: any[] = [];
  favoriteBirthdays: any[] = [];

  constructor() {
    this.currentDate = new Date().toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Kolkata'
    });
  }

  ngOnInit() {
    this.startClock();
    this.loadUpcomingHolidays();
    this.loadFavoriteBirthdays();
    this.loadRecentClicks();
  }

  startClock() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  updateClock() {
    const now = new Date();
    
    // Analog Clock Calculation
    this.hourDeg = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;
    this.minuteDeg = now.getMinutes() * 6;
    this.secondDeg = now.getSeconds() * 6;
    
    // Digital Clock Format
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    this.digitalTime = `${hours}:${minutes}:${seconds} ${ampm}`;
  }

  trackClick(title: string) {
    const now = new Date().toLocaleTimeString('en-IN', { hour12: true });
    this.recentClicks.unshift({ title, time: now });

    if (this.recentClicks.length > 5) {
      this.recentClicks.pop(); // Keep only last 5 clicks
    }

    // Save to localStorage
    localStorage.setItem('recentClicks', JSON.stringify(this.recentClicks));
  }

  loadRecentClicks() {
    const storedClicks = localStorage.getItem('recentClicks');
    if (storedClicks) {
      this.recentClicks = JSON.parse(storedClicks);
    }
  }

  ngAfterViewInit() {
    try {
      const carouselElement = document.querySelector('#carouselExampleAutoplaying');
      if (carouselElement) {
        new bootstrap.Carousel(carouselElement, {
          interval: 4000,
          ride: 'carousel'
        });
      }
    } catch (error) {
      console.warn('Bootstrap carousel initialization failed', error);
    }
  }

  getBirthdaysByDate(date: string) {
    return this.birthdays.filter(birthday => birthday.date === date);
  }

  loadUpcomingHolidays() {
    const currentMonth = new Date().getMonth() + 1; // 1-based month
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    this.currentAndNextMonthHolidays = this.holidays.filter(
      holiday => holiday.month === currentMonth || holiday.month === nextMonth
    );
  }

  loadFavoriteBirthdays() {
    this.favoriteBirthdays = this.birthdays.filter(birthday => birthday.image !== '');
  }


 // Upcoming Events (Static Example)
 upcomingEvents = [
  { title: "Project Deadline", date: "Mar 1, 2025", time: "5:00 PM", location: "Office" },
  { title: "Team Meeting", date: "Mar 5, 2025", time: "10:00 AM", location: "Zoom" },
  { title: "Client Call", date: "Mar 7, 2025", time: "2:00 PM", location: "Google Meet" }
];

// Reminders (To-Do List)
reminders = [
  { task: "Submit project report", dueDate: "Feb 29, 2025", completed: false },
  { task: "Book flight tickets", dueDate: "Mar 2, 2025", completed: false },
  { task: "Pay electricity bill", dueDate: "Mar 3, 2025", completed: false }
];



ngOnInit1(): void {}

// Toggle completion status
toggleReminder(index: number) {
  this.reminders[index].completed = !this.reminders[index].completed;
}


}
