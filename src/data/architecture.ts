// Architecture section data - separated for maintainability

export interface TechItem {
  name: string;
  icon: string;
  description: string;
  category: TechCategory;
}

export type TechCategory = "frontend" | "backend" | "database" | "infra" | "monitoring";

export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
}

export interface DiagramLayer {
  label: string;
  className: string;
  items: Array<{ icon: string; label: string; wide?: boolean }>;
}

export const CATEGORY_CONFIG: Record<TechCategory, { color: string; label: string }> = {
  frontend: { color: "#61dafb", label: "Frontend" },
  backend: { color: "#68a063", label: "Backend Services" },
  database: { color: "#336791", label: "Data Layer" },
  infra: { color: "#ff9900", label: "Infrastructure" },
  monitoring: { color: "#e535ab", label: "Observability" },
} as const;

export const TECH_STACK: TechItem[] = [
  // Frontend
  { name: "React + TypeScript", icon: "⚛️", description: "Type-safe UI with component architecture", category: "frontend" },
  { name: "Vite", icon: "⚡", description: "Lightning-fast build tool and dev server", category: "frontend" },
  { name: "TailwindCSS", icon: "🎨", description: "Utility-first styling for rapid development", category: "frontend" },
  
  // Backend
  { name: "Next.js API Routes", icon: "▲", description: "Full-stack React with serverless API", category: "backend" },
  { name: "tRPC", icon: "🔷", description: "End-to-end typesafe APIs", category: "backend" },
  { name: "Redis", icon: "🔴", description: "Session management & caching layer", category: "backend" },
  { name: "BullMQ", icon: "🐂", description: "Redis-based job queues for background tasks", category: "backend" },
  
  // Database
  { name: "PostgreSQL", icon: "🐘", description: "Primary data store with JSONB support", category: "database" },
  { name: "Prisma ORM", icon: "△", description: "Type-safe database access & migrations", category: "database" },
  
  // Infrastructure
  { name: "Docker", icon: "🐳", description: "Containerized deployments", category: "infra" },
  { name: "Kubernetes", icon: "☸️", description: "Orchestration for scalability", category: "infra" },
  { name: "AWS", icon: "☁️", description: "EC2, RDS, S3, CloudFront", category: "infra" },
  { name: "GitHub Actions", icon: "🔄", description: "CI/CD pipelines", category: "infra" },
  
  // Monitoring
  { name: "DataDog", icon: "📊", description: "APM, logs, and metrics", category: "monitoring" },
  { name: "Sentry", icon: "🛡️", description: "Error tracking & alerting", category: "monitoring" },
];

export const API_ENDPOINTS: ApiEndpoint[] = [
  { method: "GET", path: "/api/v1/portfolio", description: "Fetch portfolio data" },
  { method: "GET", path: "/api/v1/recommendations", description: "List recommendations with pagination" },
  { method: "POST", path: "/api/v1/recommendations", description: "Submit new recommendation (auth required)" },
  { method: "GET", path: "/api/v1/analytics/visitors", description: "Real-time visitor stats" },
  { method: "POST", path: "/api/v1/contact", description: "Send contact form (rate-limited)" },
  { method: "GET", path: "/api/v1/health", description: "Service health check" },
];

export const DIAGRAM_LAYERS: DiagramLayer[] = [
  {
    label: "Client",
    className: "client-layer",
    items: [
      { icon: "🌐", label: "React SPA" },
      { icon: "📱", label: "Mobile App" },
    ],
  },
  {
    label: "Edge",
    className: "gateway-layer",
    items: [{ icon: "🛡️", label: "CloudFront CDN + WAF", wide: true }],
  },
  {
    label: "API Gateway",
    className: "api-layer",
    items: [{ icon: "🚪", label: "Load Balancer + Rate Limiting", wide: true }],
  },
  {
    label: "Services",
    className: "services-layer",
    items: [
      { icon: "▲", label: "Next.js API" },
      { icon: "🔷", label: "tRPC Router" },
      { icon: "📊", label: "Analytics" },
    ],
  },
  {
    label: "Data",
    className: "data-layer",
    items: [
      { icon: "🐘", label: "PostgreSQL" },
      { icon: "🔴", label: "Redis + BullMQ" },
      { icon: "△", label: "Prisma ORM" },
    ],
  },
];

export const ARCHITECTURE_FEATURES = [
  "Horizontal scaling with K8s",
  "99.9% uptime SLA",
  "Auto-scaling based on load",
  "Blue-green deployments",
] as const;

export const DB_FEATURES = [
  { icon: "🔄", label: "Prisma migrations" },
  { icon: "📈", label: "Connection pooling" },
  { icon: "🔒", label: "Row-level security" },
  { icon: "💾", label: "Daily backups" },
] as const;

export const API_FEATURES = ["🔐 JWT Auth", "📄 OpenAPI Docs", "⚡ Rate Limited", "📊 Versioned"] as const;

export const DB_SCHEMA = `-- Core Tables
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  linkedin_url VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  relationship VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE analytics (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_recommendations_status ON recommendations(status);
CREATE INDEX idx_analytics_event_type ON analytics(event_type);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);`;
