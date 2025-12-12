export const personalInfo = {
  name: "Oleg Maksimov",
  title: "Backend Engineer & Co-founder",
  tagline: "Building scalable, high-performance applications",
  linkedin: "https://www.linkedin.com/in/olegmaksimov/",
  github: "https://github.com/UncleLeggs",
  cvPath: import.meta.env.BASE_URL + "assets/CV_OLEG_MAKSIMOV.pdf",
};

export const aboutMe = `Experienced backend engineer and co-founder with a strong focus on building scalable, high-performance applications. Skilled in TypeScript, Node.js, Python, and databases like PostgreSQL, MySQL, and MongoDB, with hands-on experience in API design, third-party integrations, event-driven architectures, and cloud deployments (AWS, Docker, Kubernetes).

I have contributed to codebase refactoring, technical strategy, and operational efficiency, while collaborating closely with frontend teams, PMs, and QA to deliver high-quality solutions. Passionate about continuous learning, I stay up-to-date with industry trends and enjoy tackling challenging problems to improve system reliability, performance, and scalability.`;

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
    role: "Back End Engineer",
    period: "Sep 2023 – Present",
    location: "Paris, France",
    website: "https://strapi.io/",
    highlights: [
      "Worked within a large monorepository environment, contributing to backend services with strong code quality and maintainability",
      "Led major codebase refactoring to clean Application/Infrastructure/Service layered architecture",
      "Implemented third-party API integrations with secure communication and robust error handling",
      "Built Docker-based deployment service supporting AWS, DigitalOcean, and Kubernetes",
      "Developed scalable APIs using Node.js, TypeScript, and PostgreSQL",
      "Built event-driven workflows using Kafka and RabbitMQ for high-throughput architectures",
      "Automated CI/CD pipelines via GitHub Actions",
      "Maintained 99% service uptime through on-call program participation",
    ],
  },
  {
    company: "Datagatherers",
    role: "Co-founder & Backend Developer",
    period: "Jul 2019 – Sep 2023",
    location: "Lisbon, Portugal",
    website: "https://datagatherers.com/",
    highlights: [
      "Developed and optimized applications for data gathering, processing, and delivery",
      "Full software development lifecycle: requirements, design, coding, testing, deployment",
      "Worked with TypeScript, Python, Node.js, MySQL, MongoDB, and AWS",
      "Designed scalable APIs and integrated third-party services",
      "Co-founder level contributions: product direction, technical decisions, client contracts",
    ],
  },
  {
    company: "Teleperformance / Cognizant",
    role: "Call Centre Quality Analyst",
    period: "Feb 2017 – May 2019",
    location: "Lisbon, Portugal",
    website: "https://www.cognizant.com/",
    highlights: [
      "Developed QA processes including call monitoring, evaluation, and coaching",
      "Managed and trained QA analysts, supporting career development",
      "Implemented performance metrics and KPIs",
      "Completed 6 Sigma courses for process improvement",
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
  { name: "PostgreSQL", category: "database" },
  { name: "MongoDB", category: "database" },
  { name: "MySQL", category: "database" },
  { name: "AWS", category: "cloud" },
  { name: "Docker", category: "tools" },
  { name: "Kubernetes", category: "cloud" },
  { name: "Git/GitHub", category: "tools" },
  { name: "Kafka", category: "tools" },
  { name: "RabbitMQ", category: "tools" },
  { name: "DataDog", category: "tools" },
  { name: "ELK Stack", category: "tools" },
  { name: "HTML & CSS", category: "language" },
];

export const education = {
  institution: "Instituto Superior Técnico",
  degree: "Bachelor's in Engineering",
  period: "2009 – 2014",
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
  { name: "Russian", level: "Native", flag: "🇷🇺" },
  { name: "Ukrainian", level: "Native", flag: "🇺🇦" },
  { name: "Portuguese", level: "Fluent", flag: "🇵🇹" },
  { name: "English", level: "Fluent", flag: "🇬🇧" },
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
