const serverSDKContent = `
## Quick Start
### Installation
\`\`\`bash
npm install lightfoot-server-sdk
\`\`\`

### Set up
The entry point to the Server SDK is the **LightFootSDK** class, which is initialized with a configuration object specifying the endpoints for flag evaluation API calls and exported telemetry:
\`\`\`javascript
const { LightFootSDK } = require('lightfoot-server-sdk');

const lightFoot = new LightFootSDK({
  // Example Lightfoot flag evaluation API endpoint
  flagEvaluationURL: "http://localhost:3001",

  // Example OpenTelemetry collector endpoint
  OTLPExporterBaseUrl: "http://localhost:4318"
});
\`\`\`
Invoking the LightFootSDK instance method **init** starts telemetry emission and sets up the feature flag provider. 

The **getClient** method retrieves an instance of the feature flags client, which can then be used to get flag evaluations.  
\`\`\`javascript
// Initialize telemetry and feature flags
lightFoot.init();

// Get the OpenFeature client for feature flag evaluation
const featureFlagsClient = lightFoot.getClient();
\`\`\`


### Evaluating Flags
The feature flag client has methods for evaluating flags with boolean, string, number, and object types.
Each method expects a *flag key* indicating which flag to evaluate, a value to fall back to if the evaluation attempt fails,
and an *evaluation context* object.
\`\`\`javascript
featureFlagsClient.getBooleanValue('new-feature', false, context);
\`\`\`
The evaluation context is used to determine what value the flag should resolve with. For user contexts, it should include a *targetingKey* to uniquely identify the context along with user details such as id, role and group:
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
The evaluation method returns the result of evaluating the flag, which can then be used to determine runtime behvaior.
\`\`\`javascript
const newFeature = await featureFlagsClient.getBooleanValue("new-feature", false, context);

if (newFeature) {
  // execute code with new feature
} else {
  // execute code without new feature
}
\`\`\`
## Feature Flag Client Methods
Each evaluation method of the **FeatureFlagClient** returns a value of the corresponding type representing the result of the flag evaluation
\`\`\`ts
async getBooleanValue(flagKey: string, defaultValue: boolean, context?: EvaluationContext): boolean
\`\`\`

\`\`\`ts
async getStringValue(flagKey: string, defaultValue: string, context?: EvaluationContext): string
\`\`\`

\`\`\`ts
async getNumberValue(flagKey: string, defaultValue: number, context?: EvaluationContext): number
\`\`\`

\`\`\`ts
async getObjectValue(flagKey: string, defaultValue: object, context?: EvaluationContext): object
\`\`\`

The following methods are also available if additional details about a flag evaluation are needed, such as the variant name, evaluation reason, or error message. Each method returns an **EvaluationDetails** object containing information about the evaluation result. 
\`\`\`ts
async getBooleanDetails(flagKey: string, defaultValue: boolean, context?: EvaluationContext): EvaluationDetails<boolean>
\`\`\`

\`\`\`ts
async getStringDetails(flagKey: string, defaultValue: string, context?: EvaluationContext): EvaluationDetails<string>
\`\`\`

\`\`\`ts
async getNumberDetails(flagKey: string, defaultValue: number, context?: EvaluationContext): EvaluationDetails<number>
\`\`\`

\`\`\`ts
async getObjectDetails(flagKey: string, defaultValue: object, context?: EvaluationContext): EvaluationDetails<object>
\`\`\`

`;

export default serverSDKContent;
