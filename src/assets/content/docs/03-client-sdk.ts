const clientSDKContent = `
## Quick Start

### Installation
\`\`\`bash
npm install lightfoot-client-sdk
\`\`\`

### Set up
The entry point to the Client SDK is the **LightFootClientSDK** class, which is initialized with a configuration object specifying the endpoints for flag evaluation API calls, exported telemetry and optionally an array of URLs for propagating traces across origins:
\`\`\`javascript
const { LightFootClientSDK } = require('lightfoot-client-sdk');

// Initialize the SDK
const lightFoot = new LightFootClientSDK({
  // Example Lightfoot flag evaluation API endpoint
  flagEvaluationURL: "http://localhost:3001/",

  // Example OpenTelemetry collector endpoint
  OTLPExporterBaseURL: "http://localhost:4318",

  // Example trace header propagation endpoint array
  propagateTraceHeaderCorsUrls: ["http://localhost:3002"]
});
\`\`\`

The *evaluation context* is an object used to determine what value the flag should resolve with. For user contexts, it should include a *targetingKey* to uniquely identify the context along with user details such as id, role and group:
\`\`\`javascript

const context = {
  targetingKey: 'unique identifier for this context',
  kind: "user",
  user: {
    id: "a username or id",
    role: "role",
    group: "group"
  }
};
\`\`\`

Invoking the LightFootSDK instance method **init** starts telemetry emission and sets up the feature flag provider. In the client SDK,
an evaluation context object should be passed in to enable flag evaluations to be retrieved and cached upon initialization.
\`\`\`javascript
// Initialize telemetry and feature flags, passing in the evaluation context
await lightFoot.init(context);

// Get the OpenFeature client for feature flag evaluation
const featureFlagsClient = lightFoot.getClient();
\`\`\`
 
### Evaluating Flags
The feature flag client has methods for evaluating flags with boolean, string, number, and object types.
Each method expects a *flag key* indicating which flag to evaluate and a value to fall back to if the evaluation attempt fails.
\`\`\`jsx
const App = () => {
  const renderNewUIFeature = client.getBooleanValue("new-UI", false);
  return (
    <>
    {
    renderNewUIFeature ? 
        <>Render new UI feature</>
      : <>Render without new UI feature</>
    }
    </>
  )
}
\`\`\`

## Feature Flag Client Methods
Each evaluation method of the **FeatureFlagClient** returns a value of the corresponding type representing the result of the flag evaluation
\`\`\`ts
getBooleanValue(flagKey: string, defaultValue: boolean, context?: EvaluationContext): boolean
\`\`\`

\`\`\`ts
getStringValue(flagKey: string, defaultValue: string, context?: EvaluationContext): string
\`\`\`

\`\`\`ts
getNumberValue(flagKey: string, defaultValue: number, context?: EvaluationContext): number
\`\`\`

\`\`\`ts
getObjectValue(flagKey: string, defaultValue: object, context?: EvaluationContext): object
\`\`\`

The following methods are also available if additional details about a flag evaluation are needed, such as the variant name, evaluation reason, or error message. Each method returns an **EvaluationDetails** object containing information about the evaluation result. 
\`\`\`ts
getBooleanDetails(flagKey: string, defaultValue: boolean, context?: EvaluationContext): EvaluationDetails<boolean>
\`\`\`

\`\`\`ts
getStringDetails(flagKey: string, defaultValue: string, context?: EvaluationContext): EvaluationDetails<string>
\`\`\`

\`\`\`ts
getNumberDetails(flagKey: string, defaultValue: number, context?: EvaluationContext): EvaluationDetails<number>
\`\`\`

\`\`\`ts
getObjectDetails(flagKey: string, defaultValue: object, context?: EvaluationContext): EvaluationDetails<object>
\`\`\`
`
export default clientSDKContent;