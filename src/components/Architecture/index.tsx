import { useState, useCallback, useMemo } from "react";
import {
  TECH_STACK,
  API_ENDPOINTS,
  DIAGRAM_LAYERS,
  ARCHITECTURE_FEATURES,
  DB_FEATURES,
  API_FEATURES,
  DB_SCHEMA,
  CATEGORY_CONFIG,
  type TechCategory,
} from "../../data/architecture";
import { DiagramTab } from "./DiagramTab";
import { TechStackTab } from "./TechStackTab";
import { ApiDesignTab } from "./ApiDesignTab";
import { DatabaseTab } from "./DatabaseTab";
import { LiveApiDemo } from "./LiveApiDemo";

type TabId = "diagram" | "stack" | "api" | "db" | "demo";

interface Tab {
  id: TabId;
  icon: string;
  label: string;
}

const TABS: Tab[] = [
  { id: "demo", icon: "🔴", label: "Live Demo" },
  { id: "diagram", icon: "📐", label: "Architecture" },
  { id: "stack", icon: "🛠️", label: "Tech Stack" },
  { id: "api", icon: "🔌", label: "API Design" },
  { id: "db", icon: "🗄️", label: "Database" },
];

export const Architecture = () => {
  const [activeTab, setActiveTab] = useState<TabId>("demo");

  const handleTabChange = useCallback((tabId: TabId) => {
    setActiveTab(tabId);
  }, []);

  const groupedTech = useMemo(() => {
    return TECH_STACK.reduce(
      (acc, tech) => {
        if (!acc[tech.category]) acc[tech.category] = [];
        acc[tech.category].push(tech);
        return acc;
      },
      {} as Record<TechCategory, typeof TECH_STACK>
    );
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "demo":
        return <LiveApiDemo />;
      case "diagram":
        return <DiagramTab layers={DIAGRAM_LAYERS} features={ARCHITECTURE_FEATURES} />;
      case "stack":
        return <TechStackTab groupedTech={groupedTech} categoryConfig={CATEGORY_CONFIG} />;
      case "api":
        return <ApiDesignTab endpoints={API_ENDPOINTS} features={API_FEATURES} />;
      case "db":
        return <DatabaseTab schema={DB_SCHEMA} features={DB_FEATURES} />;
      default:
        return null;
    }
  };

  return (
    <section id="architecture" className="section architecture">
      <div className="container">
        <h2 className="section-title fancy-title">
          <span className="title-icon">🏗️</span>
          <span className="title-text">
            <span className="title-main">Backend Showcase</span>
            <span className="title-sub">Production-grade architecture & live demos</span>
          </span>
        </h2>

        <p className="architecture-intro">
          This portfolio is a static React site, but here's how I'd architect it as a 
          production-grade full-stack application — plus a live API demo.
        </p>

        <nav className="architecture-tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`arch-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>

        <div className="architecture-content" role="tabpanel">
          {renderTabContent()}
        </div>
      </div>
    </section>
  );
};
