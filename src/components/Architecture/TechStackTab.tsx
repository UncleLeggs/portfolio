import type { TechItem, TechCategory } from "../../data/architecture";

interface TechStackTabProps {
  groupedTech: Record<TechCategory, TechItem[]>;
  categoryConfig: Record<TechCategory, { color: string; label: string }>;
}

export const TechStackTab = ({ groupedTech, categoryConfig }: TechStackTabProps) => (
  <div className="tech-stack-grid">
    {(Object.entries(groupedTech) as [TechCategory, TechItem[]][]).map(
      ([category, items]) => (
        <div key={category} className="tech-category">
          <h3
            className="tech-category-title"
            style={{ color: categoryConfig[category].color }}
          >
            {categoryConfig[category].label}
          </h3>
          <div className="tech-items">
            {items.map((tech) => (
              <div key={tech.name} className="tech-item">
                <span className="tech-icon">{tech.icon}</span>
                <div className="tech-info">
                  <span className="tech-name">{tech.name}</span>
                  <span className="tech-desc">{tech.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    )}
  </div>
);
