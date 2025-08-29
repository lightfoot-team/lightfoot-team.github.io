const configurationContent = `#### Configuration (server)
##### Local Configuration 
\`\`\`javascript
const { LightFootSDK } = require('lightfoot-server-sdk');

const lightFoot = new LightFootSDK({
  flagEvaluationURL: "http://localhost:3001",   // Your Lightfoot flag evaluation API endpoint
  OTLPExporterBaseUrl: "http://localhost:4318"  // OpenTelemetry collector endpoint
});

#### Deployment Configuration
const lightFoot = new LightFootSDK({
  flagEvaluationURL: "https://api.your-lightfoot-instance.com",
  OTLPExporterBaseUrl: "https://otel-collector.your-domain.com"
});
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
`

export default configurationContent;