import type { ApiEndpoint } from "../../data/architecture";

interface ApiDesignTabProps {
  endpoints: ApiEndpoint[];
  features: readonly string[];
}

export const ApiDesignTab = ({ endpoints, features }: ApiDesignTabProps) => (
  <div className="api-design">
    <div className="api-header">
      <code className="api-base">https://api.olegmaksimov.dev</code>
      <span className="api-version">v1</span>
    </div>

    <div className="api-endpoints">
      {endpoints.map((endpoint, index) => (
        <div key={index} className="api-endpoint">
          <span className={`api-method method-${endpoint.method.toLowerCase()}`}>
            {endpoint.method}
          </span>
          <code className="api-path">{endpoint.path}</code>
          <span className="api-desc">{endpoint.description}</span>
        </div>
      ))}
    </div>

    <div className="api-features">
      {features.map((feature) => (
        <span key={feature} className="api-feature">
          {feature}
        </span>
      ))}
    </div>
  </div>
);
