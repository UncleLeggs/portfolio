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
    path: "/api/v1/users/me",
    description: "Get current user (requires auth)",
    mockResponse: () => {
      // Simulate 70% unauthorized to demonstrate auth errors
      if (Math.random() > 0.3) {
        return {
          status: 401,
          data: {
            error: "Unauthorized",
            message: "Invalid or expired token",
            code: "AUTH_TOKEN_INVALID",
            hint: "Include a valid Bearer token in the Authorization header",
            docs: "https://api.example.com/docs/authentication",
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
          createdAt: "2023-01-15T10:30:00Z",
        },
      };
    },
  },
  {
    method: "POST",
    path: "/api/v1/contact",
    description: "Submit contact form (rate limited: 3/min)",
    rateLimit: 3,
    mockResponse: () => ({
      status: 201,
      data: {
        success: true,
        ticketId: `TKT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        message: "Message queued for delivery",
        estimatedResponse: "24 hours",
        queuePosition: Math.floor(Math.random() * 10) + 1,
      },
    }),
  },
  {
    method: "POST",
    path: "/api/v1/webhooks/trigger",
    description: "Trigger webhook (rate limited: 2/min)",
    rateLimit: 2,
    mockResponse: () => ({
      status: 202,
      data: {
        accepted: true,
        webhookId: `wh_${Math.random().toString(36).substring(2, 10)}`,
        deliveryStatus: "pending",
        targetUrl: "https://webhook.site/example",
        retryPolicy: { maxAttempts: 3, backoffMs: 1000 },
      },
    }),
  },
  {
    method: "GET",
    path: "/api/v1/projects/:id",
    description: "Get project by ID (may return 404)",
    mockResponse: () => {
      // Simulate 40% not found
      if (Math.random() > 0.6) {
        return {
          status: 404,
          data: {
            error: "Not Found",
            message: "Project with the specified ID does not exist",
            code: "RESOURCE_NOT_FOUND",
            resourceType: "Project",
            suggestion: "Check the project ID or list all projects with GET /api/v1/projects",
          },
        };
      }
      return {
        status: 200,
        data: {
          id: "proj_" + Math.random().toString(36).substring(2, 8),
          name: "Strapi Cloud Platform",
          description: "Enterprise headless CMS deployment",
          tech: ["Node.js", "TypeScript", "PostgreSQL", "Kubernetes"],
          status: "active",
          metrics: { deployments: 1250, uptime: "99.9%" },
        },
      };
    },
  },
  {
    method: "PUT",
    path: "/api/v1/settings",
    description: "Update settings (validation errors)",
    mockResponse: () => {
      // Simulate 50% validation error
      if (Math.random() > 0.5) {
        return {
          status: 400,
          data: {
            error: "Bad Request",
            message: "Validation failed",
            code: "VALIDATION_ERROR",
            details: [
              { field: "email", message: "Invalid email format", received: "not-an-email" },
              { field: "timezone", message: "Unknown timezone", received: "Mars/Olympus" },
            ],
            hint: "Check the request body against the API schema",
          },
        };
      }
      return {
        status: 200,
        data: {
          success: true,
          settings: {
            theme: "dark",
            notifications: true,
            timezone: "Europe/Paris",
          },
          updatedAt: new Date().toISOString(),
        },
      };
    },
  },
  {
    method: "DELETE",
    path: "/api/v1/sessions/current",
    description: "Logout (may have service errors)",
    mockResponse: () => {
      // Simulate 20% server error
      if (Math.random() > 0.8) {
        return {
          status: 503,
          data: {
            error: "Service Unavailable",
            message: "Session service temporarily unavailable",
            code: "SERVICE_UNAVAILABLE",
            retryAfter: 30,
            statusPage: "https://status.example.com",
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
  {
    method: "GET",
    path: "/api/v1/admin/users",
    description: "Admin endpoint (requires permissions)",
    mockResponse: () => ({
      status: 403,
      data: {
        error: "Forbidden",
        message: "Insufficient permissions to access this resource",
        code: "PERMISSION_DENIED",
        requiredRole: "admin",
        currentRole: "viewer",
        hint: "Contact your administrator to request elevated permissions",
      },
    }),
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
  const [rateLimitCounts, setRateLimitCounts] = useState<Record<string, { count: number; resetTime: number }>>({});

  const executeRequest = useCallback(async () => {
    setIsLoading(true);
    setResponse(null);

    const latency = await simulateLatency();
    const requestId = `req_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;
    const now = Date.now();

    // Check rate limit for this endpoint
    let isRateLimited = false;
    let rateLimitRemaining = 100;
    
    if (selectedEndpoint.rateLimit) {
      const endpointKey = selectedEndpoint.path;
      const currentLimit = rateLimitCounts[endpointKey];
      
      // Reset if window expired (60 seconds)
      if (!currentLimit || now > currentLimit.resetTime) {
        setRateLimitCounts(prev => ({
          ...prev,
          [endpointKey]: { count: 1, resetTime: now + 60000 }
        }));
        rateLimitRemaining = selectedEndpoint.rateLimit - 1;
      } else if (currentLimit.count >= selectedEndpoint.rateLimit) {
        isRateLimited = true;
        rateLimitRemaining = 0;
      } else {
        setRateLimitCounts(prev => ({
          ...prev,
          [endpointKey]: { ...currentLimit, count: currentLimit.count + 1 }
        }));
        rateLimitRemaining = selectedEndpoint.rateLimit - currentLimit.count - 1;
      }
    }

    // Get mock response or rate limit response
    const mockResult = isRateLimited 
      ? {
          status: 429,
          data: {
            error: "Too Many Requests",
            message: `Rate limit exceeded. You've made ${selectedEndpoint.rateLimit} requests in the last minute.`,
            retryAfter: Math.ceil((rateLimitCounts[selectedEndpoint.path]?.resetTime - now) / 1000),
            limit: `${selectedEndpoint.rateLimit} requests per minute`,
            hint: "Wait for the rate limit window to reset or try a different endpoint."
          },
        }
      : selectedEndpoint.mockResponse();

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
        "x-ratelimit-remaining": rateLimitRemaining.toString(),
        "x-ratelimit-reset": selectedEndpoint.rateLimit 
          ? new Date(rateLimitCounts[selectedEndpoint.path]?.resetTime || now + 60000).toISOString()
          : new Date(now + 60000).toISOString(),
        ...(mockResult.status >= 400 && { "x-error-code": (mockResult.data as { code?: string })?.code || "RATE_LIMIT_EXCEEDED" }),
      },
    };

    setResponse(apiResponse);
    setRequestCount((prev) => prev + 1);
    if (mockResult.status >= 400) {
      setErrorCount((prev) => prev + 1);
    }
    setIsLoading(false);
  }, [selectedEndpoint, rateLimitCounts]);

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
          💡 <strong>Try it:</strong> Rate limits are real — spam the POST endpoints to trigger 429 errors. 
          Also demonstrates 400 (validation), 401 (auth), 403 (permissions), 404 (not found), and 503 (service) errors.
        </p>
      </div>
    </div>
  );
};
