export const personalInfo = {
  name: "Oleg Maksimov",
  title: "Senior Backend Engineer",
  tagline: "Building scalable systems that handle millions of requests. Node.js • TypeScript • PostgreSQL • AWS",
  linkedin: "https://www.linkedin.com/in/olegmaksimov/",
  github: "https://github.com/UncleLeggs",
  cvPath: import.meta.env.BASE_URL + "assets/CV_OLEG_MAKSIMOV.pdf",
  location: "Chanteheux, France",
  phone: "+33 6 52 64 23 77",
};

export const aboutMe = `Senior Backend Engineer with extensive experience building, refactoring, and scaling production-grade backend systems. Strong background in clean architecture, event-driven systems, and cloud-native deployments.

Proven ability to work in complex monorepositories, improve system reliability, and collaborate cross-functionally with product, frontend, and QA teams. Experienced in technical ownership, system evolution, and operational excellence.`;

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  website?: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    company: "Strapi Solutions",
    role: "Backend Engineer",
    period: "Oct 2023 – Present",
    location: "Paris, France",
    website: "https://strapi.io/",
    highlights: [
      "Develop and maintain backend services in a large-scale monorepository, ensuring code quality, modularity, and maintainability",
      "Owner of multiple implementations and features",
      "Key contributor to a major refactoring initiative, migrating the codebase to a clean Application / Infrastructure / Service architecture",
      "Design and implement secure third-party API integrations with robust error handling and reliable data flows",
      "Build scalable APIs and backend features using Node.js, TypeScript, and PostgreSQL following cloud-native best practices",
      "Implement event-driven and asynchronous workflows using Kafka and RabbitMQ",
      "Contribute to Docker-based build and deployment services across AWS, DigitalOcean, and Kubernetes environments",
      "Improve reliability through automated testing (Jest, Playwright), CI/CD pipelines, and on-call participation, maintaining ~99% service uptime",
      "Collaborate closely with Product Managers, EM, Frontend, QA, and Customer Support teams to deliver high-quality features and resolve complex issues",
    ],
  },
  {
    company: "Datagatherers",
    role: "Co-founder & Backend Developer",
    period: "Jul 2019 – Sep 2023",
    location: "Lisbon, Portugal",
    website: "https://datagatherers.com/",
    highlights: [
      "Designed, built, and operated backend systems for data gathering, processing, transformation, and delivery",
      "Worked across the full software lifecycle: requirements, system design, development, deployment, and maintenance",
      "Built scalable APIs, integrated third-party services, optimized database queries, and implemented security measures",
      "Used TypeScript, Node.js, Python, MySQL, and MongoDB; deployed and operated systems on AWS",
      "Contributed to product direction, technical strategy, operational efficiency, and client contract discussions",
    ],
  },
];

export interface Skill {
  name: string;
  category: "language" | "database" | "cloud" | "tools" | "framework";
  icon?: string;
}

export const skills: Skill[] = [
  { name: "TypeScript", category: "language" },
  { name: "JavaScript", category: "language" },
  { name: "Node.js", category: "framework" },
  { name: "Python", category: "language" },
  { name: "React", category: "framework" },
  { name: "PostgreSQL", category: "database" },
  { name: "MongoDB", category: "database" },
  { name: "MySQL", category: "database" },
  { name: "AWS", category: "cloud" },
  { name: "DigitalOcean", category: "cloud" },
  { name: "Docker", category: "tools" },
  { name: "Kubernetes", category: "cloud" },
  { name: "GitHub Actions", category: "tools" },
  { name: "CircleCI", category: "tools" },
  { name: "Kafka", category: "tools" },
  { name: "RabbitMQ", category: "tools" },
  { name: "Jest", category: "tools" },
  { name: "Playwright", category: "tools" },
  { name: "Datadog", category: "tools" },
  { name: "ELK Stack", category: "tools" },
  { name: "Auth0", category: "tools" },
];

export const education = {
  institution: "Instituto Superior Técnico",
  degree: "Bachelor's Degree (not completed) — Engineering",
  period: "",
  location: "Lisbon, Portugal",
  website: "https://tecnico.ulisboa.pt/en/",
};

export interface CountryLived {
  country: string;
  years: number;
  flag: string;
  current?: boolean;
}

export const countriesLived: CountryLived[] = [
  { country: "Ukraine", years: 12, flag: "🇺🇦" },
  { country: "Portugal", years: 18, flag: "🇵🇹" },
  { country: "Canada", years: 2, flag: "🇨🇦" },
  { country: "France", years: 4, flag: "🇫🇷", current: true },
];

export interface Language {
  name: string;
  level: "Native" | "Fluent" | "Professional" | "Conversational";
  flag: string;
}

export const languages: Language[] = [
  { name: "Ukrainian", level: "Native", flag: "🇺🇦" },
  { name: "Portuguese", level: "Native", flag: "🇵🇹" },
  { name: "English", level: "Fluent", flag: "🇬🇧" },
  { name: "Russian", level: "Fluent", flag: "🇷🇺" },
  { name: "French", level: "Professional", flag: "🇫🇷" },
];

export interface Recommendation {
  name: string;
  role: string;
  company: string;
  text: string;
  relationship: string;
  date?: string;
  linkedinUrl?: string;
  avatarUrl?: string;
}

export const recommendations: Recommendation[] = [
  {
    name: "Hicham El Abbassi",
    role: "Lead Front End Developer",
    company: "Strapi",
    text: "I had the chance to work with Oleg for many years, and it was truly a pleasure every day. He's always friendly, professional, and someone you can rely on without hesitation. He brings great energy to the team and makes work more enjoyable. A fantastic colleague I highly recommend.",
    relationship: "Worked on the same team",
    date: "December 2025",
    linkedinUrl: "https://www.linkedin.com/in/hicham-elbsi/",
  },
  {
    name: "Gonzalo García Calcaterra",
    role: "Backend Engineer",
    company: "Strapi",
    text: "I had the pleasure of working directly with Oleg on several platform initiatives, and he quickly became someone I could always rely on. He's fearless when tackling problems and consistently goes straight to the root of any issue. Beyond his technical depth, Oleg brings a ton of positive energy to every interaction. Anyone would be lucky to have him on their team.",
    relationship: "Senior colleague",
    date: "December 2025",
    linkedinUrl: "https://www.linkedin.com/in/gonzalo-garc%C3%ADa-calcaterra/",
  },
  {
    name: "Fatma Atallah",
    role: "Front End Developer",
    company: "Strapi",
    text: "I had the pleasure of working with Oleg on the same squad, and he was an outstanding backend engineer. Always reliable, collaborative, and quick to unblock the team. His technical skills and ownership made a real impact. I'd work with him again anytime.",
    relationship: "Worked on the same team",
    date: "December 2025",
    linkedinUrl: "https://www.linkedin.com/in/fatma-a-13675b83/",
  },
  {
    name: "Pedro Esperança",
    role: "Engineering Manager & 6x Founder",
    company: "Data Gatherers",
    text: "Oleg was our first hire at Data Gatherers. He's one of the main reasons for the company's success. He credits mine and João Ribeiro's mentorship for his lightning fast learning, but it's entirely his doing. It was his eagerness and curiosity on how to do things well that led him to become such a great software developer in such little time. I strongly recommend Oleg to any company looking to hire someone eager, humble and dedicated to the point of looking for a better way of doing things every day.",
    relationship: "Managed directly",
    date: "August 2021",
    linkedinUrl: "https://www.linkedin.com/in/esperancajs/",
  },
];

// LinkedIn profile URL for recommendations
export const LINKEDIN_RECOMMENDATIONS_URL = "https://www.linkedin.com/in/olegmaksimov/details/recommendations/";

export const easterEggs = {
  konamiCode: ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"],
  secretMessages: [
    "🚀 You found a secret! I love building things that scale.",
    "☕ Fun fact: I run on coffee and TypeScript.",
    "🎮 Konami code activated! You're a true gamer.",
    "🐛 No bugs here... just features in disguise.",
    "💡 Pro tip: Always read the docs. Always.",
  ],
  clickThreshold: 7,
};
