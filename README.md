# Oleg Maksimov - Portfolio

A modern, interactive portfolio website showcasing my journey as a Backend Engineer. Built with React, TypeScript, and Vite.

🌐 **Live Demo**: [olegmaksimov.dev](https://olegmaksimov.dev)

## ✨ Features

### Core Sections
- **Hero** - Animated typewriter effect with role titles
- **About** - Personal introduction with key highlights
- **Career Journey** - Interactive timeline with company illustrations and expandable details
- **Tech Stack** - Categorized skills with growth mindset message
- **Global Journey** - Visual timeline of countries lived with flags
- **Backend Showcase** - Interactive architecture demo with:
  - 🔴 Live API Sandbox (simulated endpoints with error responses)
  - 📐 System Architecture Diagram
  - 🛠️ Tech Stack Overview
  - 🔌 RESTful API Design
  - 🗄️ Database Schema
- **Recommendations** - Carousel of LinkedIn recommendations with auto-play
- **Contact** - Email with copy/send actions, LinkedIn, and resume download

### Technical Highlights
- ⚡ **Fast** - Built with Vite for lightning-fast development and builds
- 🎨 **Modern UI** - Clean, responsive design with smooth animations
- 📱 **Mobile-first** - Fully responsive across all devices
- 🧪 **Tested** - 69 tests with Vitest + React Testing Library
- 🔍 **SEO Optimized** - Meta tags, Open Graph, structured data
- ♿ **Accessible** - ARIA labels, keyboard navigation, semantic HTML
- 🥚 **Easter Eggs** - Try the Konami code! ↑↑↓↓←→←→BA

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library
- **Styling**: CSS with custom properties (CSS Variables)
- **Deployment**: Netlify / GitHub Pages

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests once
npm test -- --run

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Architecture/     # Backend showcase (modular)
│   │   ├── index.tsx
│   │   ├── LiveApiDemo.tsx
│   │   ├── DiagramTab.tsx
│   │   ├── TechStackTab.tsx
│   │   ├── ApiDesignTab.tsx
│   │   └── DatabaseTab.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Skills.tsx
│   ├── WorldMap.tsx
│   ├── Recommendations.tsx
│   ├── Contact.tsx
│   └── Navigation.tsx
├── hooks/                # Custom React hooks
│   ├── useTypewriter.ts
│   └── useKonamiCode.ts
├── data/                 # Portfolio data (separated from components)
│   ├── portfolio.ts
│   └── architecture.ts
├── __tests__/            # Test files (mirrors src structure)
└── App.tsx               # Main app component
```

## 🧪 Testing

```bash
# Run tests in watch mode
npm test

# Run tests once
npm test -- --run

# Run with coverage
npm test -- --coverage
```

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests in watch mode |
| `npm test -- --run` | Run tests once |

## 🌐 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages
1. Push to `main` branch
2. GitHub Actions automatically builds and deploys
3. Site is live at `https://username.github.io/portfolio/`

## 📝 Customization

### Update Personal Info
Edit `src/data/portfolio.ts`:
- `personalInfo` - Name, title, links
- `experiences` - Work history
- `skills` - Technical skills
- `recommendations` - LinkedIn recommendations

### Update Architecture Demo
Edit `src/data/architecture.ts`:
- `TECH_STACK` - Technologies
- `API_ENDPOINTS` - API design examples
- `DIAGRAM_LAYERS` - Architecture diagram

## 📄 License

MIT

---

Built with ❤️ by [Oleg Maksimov](https://www.linkedin.com/in/olegmaksimov/)
