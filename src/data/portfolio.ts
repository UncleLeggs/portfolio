export const personalInfo = {
  name: "Oleg Maksimov",
  title: "Backend Engineer & Co-founder",
  tagline: "Building scalable, high-performance applications",
  linkedin: "https://www.linkedin.com/in/olegmaksimov/",
  github: "https://github.com/UncleLeggs",
  cvPath: "/assets/CV_OLEG_MAKSIMOV.pdf",
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
    period: "Oct 2022 – Present",
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
    period: "Jul 2019 – Sep 2022",
    location: "Lisbon, Portugal",
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
