const docsContent = `
## Using the Lightfoot SDKs

### LightFoot Server SDK
#### Installation
\`\`\`bash
npm install lightfoot-server-sdk
\`\`\`

#### Quick Start
\`\`\`javascript
const { LightFootSDK } = require('lightfoot-server-sdk');

// Initialize the SDK
const lightFoot = new LightFootSDK({
  flagEvaluationURL: "http://localhost:3001",
  OTLPExporterBaseUrl: "http://localhost:4318"
});

// Initialize telemetry and feature flags
lightFoot.init();

// Get the OpenFeature client for feature flag evaluation
const featureFlagsClient = lightFoot.getClient();
\`\`\`

#### Configuration
##### Local Configuration 
\`\`\`javascript
const { LightFootSDK } = require('lightfoot-server-sdk');

const lightFoot = new LightFootSDK({
  flagEvaluationURL: "http://localhost:3001",   // Your Lightfoot flag evaluation API endpoint
  OTLPExporterBaseUrl: "http://localhost:4318"  // OpenTelemetry collector endpoint
});
\`\`\`

##### Deployment Configuration
\`\`\`javascript
const lightFoot = new LightFootSDK({
  flagEvaluationURL: "https://api.your-lightfoot-instance.com",
  OTLPExporterBaseUrl: "https://otel-collector.your-domain.com"
});
\`\`\`

#### Usage Example
\`\`\`javascript
function getUserContext(req) {
  const userId = req.get('x-user-id');
  return {
    targetingKey: userId,
    kind: 'user',
    user: {
      id: userId,
      role: req.get('x-user-role') || '',
      group: req.get('x-user-group') || '',
    }
  };
}

router.get("/", (async(req, _)) => {
  const context = getUserContext(req);
  const newFeature = featureFlagsClient.getBooleanValue("new-feature", false, context);

  if (newFeature) {
    // execute code with new feature
  } else {
    // execute code without new feature
  }
});
\`\`\`

### LightFoot Client SDK

#### Installation
\`\`\`bash
npm install lightfoot-client-sdk
\`\`\`

#### Quick Start
\`\`\`javascript
const { LightFootClientSDK } = require('lightfoot-client-sdk');

// Initialize the SDK
const lightFoot = new LightFootClientSDK({
  OTLPExporterBaseURL: "http://localhost:5173",
  tracesBaseUrl: "http://localhost:4318/",
  propagateTraceHeaderCorsUrls: ["http://localhost:4318/"]
});

const evalContext = {
  targetingKey: user.id,
  kind: 'user',
  user: {
    id: user.id,
    role: user.role,
    group: user.group
  }
}

// Initialize telemetry and feature flags, passing in the evaluation context
lightFoot.init(evalContext);

// Get the OpenFeature client for feature flag evaluation
const featureFlagsClient = lightFoot.getClient();
\`\`\`

#### Configuration
##### Local Configuration 
\`\`\`javascript
const { LightFootClientSDK } = require('lightfoot-client-sdk');

const lightFoot = new LightFootClientSDK({
  OTLPExporterBaseURL: "http://localhost:5173",          // Your local development server
  tracesBaseUrl: "http://localhost:4318/",               // OpenTelemetry collector endpoint
  propagateTraceHeaderCorsUrls: ["http://localhost:4318/"]  // URLs to propagate trace headers to
});
\`\`\`

##### Deployment Configuration
\`\`\`javascript
const lightFoot = new LightFootSDK({
  OTLPExporterBaseURL: "https://your-app.com",
  tracesBaseUrl: "https://otel-collector.your-domain.com/",
  propagateTraceHeaderCorsUrls: ["https://otel-collector.your-domain.com"]
});
\`\`\`

#### Usage Example
\`\`\`jsx
const HomePage = () => {
  const [newUIFeature, setNewUIFeature] = useState(false);

  useEffect(() => {
    const initializeFeatureFlags = async () => {
      try {
        const evalContext = {
          targetingKey: user.id,
          kind: 'user',
          user: {
            id: user.id,
            role: user.role,
            group: user.group
          }
        };
        await lightFootClient.init(evalContext);
        const client = lightFootClient.getClient();
        const flagValue = client.getBooleanValue("new-UI", false);
        setNewUIFeature(flagValue);
      } catch (error) {
        console.error('Failed to load feature flags:', error);
      }
    };

    initializeFeatureFlags();
  }, []);

  return (
    <>
      {newUIFeature ? (
        <>Render new UI feature</>
      ) : (
        <>Render without new UI feature</>
      )}
    </>
  );
};
\`\`\`

### Methods Available on the Feature Flag Client
\`getBooleanValue(flagKey: string, defaultValue: boolean, context?: EvaluationContext): boolean\`

\`getStringValue(flagKey: string, defaultValue: string, context?: EvaluationContext): string\`

\`getNumberValue(flagKey: string, defaultValue: number, context?: EvaluationContext): number\`

\`getObjectValue(flagKey: string, defaultValue: object, context?: EvaluationContext): object\`

#### Requirements
- Node.js 16.0.0 or higher
- TypeScript 4.5+ (if using TypeScript)
- Modern web browser with ES2017+ support`;

export default docsContent;
