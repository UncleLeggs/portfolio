import { useState, useCallback, useEffect } from "react";

// ============================================================================
// Types & Interfaces
// ============================================================================

interface ApiResponse {
  status: number;
  statusText: string;
  data: unknown;
  latency: number;
  timestamp: string;
  headers: Record<string, string>;
  cached?: boolean;
}

interface DemoEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  mockResponse: () => { status: number; data: unknown };
  rateLimit?: number;
}

// ============================================================================
// Constants
// ============================================================================

const HTTP_STATUS: Record<number, string> = {
  200: "OK",
  201: "Created",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  429: "Too Many Requests",
  500: "Internal Server Error",
  503: "Service Unavailable",
};

const DEMO_ENDPOINTS: readonly DemoEndpoint[] = [
  {
    method: "GET",
    path: "/api/v1/health",
    description: "Health check endpoint",
    mockResponse: () => ({
      status: 200,
      data: {
        status: "healthy",
        version: "2.1.0",
        environment: "production",
        uptime: `${Math.floor(Math.random() * 1000000)}s`,
        services: {
          database: { status: "connected", latency: "2ms" },
          redis: { status: "connected", latency: "1ms" },
          queue: { status: "connected", jobs: 42 },
        },
        memory: {
          used: `${Math.floor(Math.random() * 500)}MB`,
          total: "1024MB",
        },
      },
    }),
  },
  {
    method: "GET",
    path: "/api/v1/portfolio/stats",
    description: "Portfolio analytics",
    mockResponse: () => ({
      status: 200,
      data: {
        visitors: {
          total: Math.floor(Math.random() * 10000) + 5000,
          unique: Math.floor(Math.random() * 5000) + 2000,
          returning: Math.floor(Math.random() * 1000) + 500,
        },
        engagement: {
          avgSessionDuration: "2m 34s",
          bounceRate: "32%",
          pagesPerSession: 4.2,
        },
        topReferrers: ["linkedin.com", "github.com", "google.com"],
        peakHours: ["14:00", "16:00", "20:00"],
      },
    }),
  },
  {
    method: "GET",
    path: "/api/v1/users/me",
    description: "Get current user (requires auth)",
    mockResponse: () => {
      // Simulate 70% success, 30% unauthorized
      if (Math.random() > 0.3) {
        return {
          status: 401,
          data: {
            error: "Unauthorized",
            message: "Invalid or expired token",
            code: "AUTH_TOKEN_INVALID",
            hint: "Please include a valid Bearer token in the Authorization header",
          },
        };
      }
      return {
        status: 200,
        data: {
          id: "usr_" + Math.random().toString(36).substring(2, 10),
          email: "demo@example.com",
          role: "viewer",
          permissions: ["read:portfolio", "read:stats"],
        },
      };
    },
  },
  {
    method: "POST",
    path: "/api/v1/contact",
    description: "Submit contact form",
    rateLimit: 5,
    mockResponse: () => {
      // Simulate rate limiting (20% chance)
      if (Math.random() > 0.8) {
        return {
          status: 429,
          data: {
            error: "Too Many Requests",
            message: "Rate limit exceeded",
            retryAfter: 60,
            limit: "5 requests per minute",
          },
        };
      }
      return {
        status: 201,
        data: {
          success: true,
          ticketId: `TKT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          message: "Message queued for delivery",
          estimatedResponse: "24 hours",
          queuePosition: Math.floor(Math.random() * 10) + 1,
        },
      };
    },
  },
  {
    method: "GET",
    path: "/api/v1/projects/featured",
    description: "Get featured projects",
    mockResponse: () => ({
      status: 200,
      data: {
        projects: [
          { id: 1, name: "Strapi Cloud", tech: ["Node.js", "PostgreSQL", "K8s"] },
          { id: 2, name: "Data Pipeline", tech: ["Python", "Kafka", "Redis"] },
          { id: 3, name: "Portfolio API", tech: ["Next.js", "tRPC", "Prisma"] },
        ],
        meta: { total: 3, featured: true },
      },
    }),
  },
  {
    method: "DELETE",
    path: "/api/v1/sessions/current",
    description: "Logout current session",
    mockResponse: () => {
      // Simulate server error (15% chance)
      if (Math.random() > 0.85) {
        return {
          status: 503,
          data: {
            error: "Service Unavailable",
            message: "Session service temporarily unavailable",
            code: "SERVICE_UNAVAILABLE",
            retryAfter: 30,
          },
        };
      }
      return {
        status: 200,
        data: {
          success: true,
          message: "Session terminated",
          invalidatedAt: new Date().toISOString(),
        },
      };
    },
  },
] as const;

// ============================================================================
// Utility Functions
// ============================================================================

const simulateLatency = async (): Promise<number> => {
  const baseLatency = Math.floor(Math.random() * 100) + 20;
  const jitter = Math.floor(Math.random() * 50);
  const latency = baseLatency + jitter;
  await new Promise((resolve) => setTimeout(resolve, latency));
  return latency;
};

export const LiveApiDemo = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<DemoEndpoint>(DEMO_ENDPOINTS[0]);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const executeRequest = useCallback(async () => {
    setIsLoading(true);
    setResponse(null);

    const latency = await simulateLatency();
    const mockResult = selectedEndpoint.mockResponse();
    const requestId = `req_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;

    const apiResponse: ApiResponse = {
      status: mockResult.status,
      statusText: HTTP_STATUS[mockResult.status] || "Unknown",
      data: mockResult.data,
      latency,
      timestamp: new Date().toISOString(),
      headers: {
        "content-type": "application/json; charset=utf-8",
        "x-request-id": requestId,
        "x-response-time": `${latency}ms`,
        "x-ratelimit-limit": selectedEndpoint.rateLimit?.toString() || "100",
        "x-ratelimit-remaining": Math.floor(Math.random() * 100).toString(),
        ...(mockResult.status >= 400 && { "x-error-code": (mockResult.data as { code?: string })?.code || "UNKNOWN" }),
      },
    };

    setResponse(apiResponse);
    setRequestCount((prev) => prev + 1);
    if (mockResult.status >= 400) {
      setErrorCount((prev) => prev + 1);
    }
    setIsLoading(false);
  }, [selectedEndpoint]);

  useEffect(() => {
    executeRequest();
  }, []);

  const successRate = requestCount > 0 
    ? Math.round(((requestCount - errorCount) / requestCount) * 100) 
    : 100;

  return (
    <div className="live-api-demo">
      <div className="demo-header">
        <div className="demo-status">
          <span className="status-dot live" />
          <span>Live API Sandbox</span>
        </div>
        <div className="demo-stats">
          <span className="stat">
            <strong>{requestCount}</strong> requests
          </span>
          <span className="stat">
            <strong className={errorCount > 0 ? "error-count" : ""}>{errorCount}</strong> errors
          </span>
          <span className="stat">
            <strong>{successRate}%</strong> success
          </span>
        </div>
      </div>

      <div className="demo-content">
        <div className="demo-sidebar">
          <h4>API Endpoints</h4>
          <p className="sidebar-hint">Click to select, then send request</p>
          <div className="endpoint-list">
            {DEMO_ENDPOINTS.map((endpoint) => (
              <button
                key={endpoint.path}
                className={`endpoint-btn ${selectedEndpoint.path === endpoint.path ? "active" : ""}`}
                onClick={() => setSelectedEndpoint(endpoint)}
              >
                <span className={`method method-${endpoint.method.toLowerCase()}`}>
                  {endpoint.method}
                </span>
                <span className="path">{endpoint.path}</span>
                {endpoint.rateLimit && <span className="rate-badge">Rate Limited</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="demo-main">
          <div className="request-panel">
            <div className="panel-header">
              <span>📤 Request</span>
              <button
                className="send-btn"
                onClick={executeRequest}
                disabled={isLoading}
              >
                {isLoading ? "⏳ Sending..." : "▶ Send Request"}
              </button>
            </div>
            <div className="request-preview">
              <code>
                <span className="req-method">{selectedEndpoint.method}</span>{" "}
                <span className="req-url">https://api.olegmaksimov.dev{selectedEndpoint.path}</span>
              </code>
              <p className="req-desc">{selectedEndpoint.description}</p>
              {selectedEndpoint.rateLimit && (
                <p className="req-warning">⚠️ Rate limited: {selectedEndpoint.rateLimit} req/min</p>
              )}
            </div>
          </div>

          <div className={`response-panel ${response && response.status >= 400 ? "has-error" : ""}`}>
            <div className="panel-header">
              <span>📥 Response</span>
              {response && (
                <div className="response-meta">
                  <span className={`status-code status-${Math.floor(response.status / 100)}xx`}>
                    {response.status} {response.statusText}
                  </span>
                  <span className="latency">{response.latency}ms</span>
                </div>
              )}
            </div>
            <div className="response-body">
              {isLoading ? (
                <div className="loading-state">
                  <div className="loading-spinner" />
                  <span>Processing request...</span>
                </div>
              ) : response ? (
                <pre className={response.status >= 400 ? "error-response" : ""}>
                  <code>{JSON.stringify(response.data, null, 2)}</code>
                </pre>
              ) : null}
            </div>
            {response && (
              <div className="response-headers">
                <h5>Response Headers</h5>
                <div className="headers-list">
                  {Object.entries(response.headers).map(([key, value]) => (
                    <div key={key} className="header-item">
                      <span className="header-key">{key}:</span>
                      <span className="header-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="demo-footer">
        <p>
          💡 <strong>Note:</strong> This sandbox simulates real API behavior including auth errors (401), 
          rate limiting (429), and service errors (503). Try different endpoints to see various responses!</p>
      </div>
    </div>
  );
};
