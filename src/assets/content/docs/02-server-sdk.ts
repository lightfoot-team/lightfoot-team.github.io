const serverSDKContent = `
### LightFoot Server SDK
### Installation
\`\`\`bash
npm install lightfoot-server-sdk
\`\`\`

### Quick Start
The entry point to the SDK is the **LightFootSDK** class, which is initialized with a configuration object specifying the endpoints for flag evaluation API calls and exported telemetry:
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

Each method expects an *evaluation context* for determining what value the flag should resolve with. To evaluate a flag for a given user, 
a context object specifying a targetingKey along with user details such as id, role and group can be passed into the evaluation method. 
\`\`\`javascript

  const context = {
    targetingKey: 'unqiue identifier for this context',
    user: {
      id: "user's username or id",
      role: "user's role",
      group: "user's group"
    }
  };
\`\`\`
\`\`\`javascript
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

`;

export default serverSDKContent;
