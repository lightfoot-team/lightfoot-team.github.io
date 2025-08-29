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
`

export defaultt configurationContent;