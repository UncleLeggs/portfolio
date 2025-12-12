import type { DiagramLayer } from "../../data/architecture";

interface DiagramTabProps {
  layers: DiagramLayer[];
  features: readonly string[];
}

export const DiagramTab = ({ layers, features }: DiagramTabProps) => (
  <div className="arch-diagram">
    <div className="diagram-container">
      {layers.map((layer, index) => (
        <div key={layer.label}>
          <div className={`diagram-layer ${layer.className}`}>
            <div className="layer-label">{layer.label}</div>
            {layer.items.map((item) => (
              <div
                key={item.label}
                className={`diagram-box ${item.wide ? "wide" : ""}`}
              >
                <span className="box-icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          {index < layers.length - 1 && <div className="diagram-arrow">↓</div>}
        </div>
      ))}
    </div>

    <div className="diagram-features">
      {features.map((feature) => (
        <div key={feature} className="feature-item">
          <span className="feature-icon">✅</span>
          <span>{feature}</span>
        </div>
      ))}
    </div>
  </div>
);
