interface DatabaseTabProps {
  schema: string;
  features: readonly { icon: string; label: string }[];
}

export const DatabaseTab = ({ schema, features }: DatabaseTabProps) => (
  <div className="db-schema">
    <pre className="schema-code">
      <code>{schema}</code>
    </pre>

    <div className="db-features">
      {features.map((feature) => (
        <div key={feature.label} className="db-feature">
          <span className="db-feature-icon">{feature.icon}</span>
          <span>{feature.label}</span>
        </div>
      ))}
    </div>
  </div>
);
