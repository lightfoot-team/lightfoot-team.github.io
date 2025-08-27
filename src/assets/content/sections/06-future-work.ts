const content = `
# Future Work

LightFoot provides a strong foundation for teams aiming to implement feature flags safely with built-in enriched observability, but it would benefit from several enhancements. Below, we detail the improvements that could be made.

## Enhanced feature flag management

LightFoot offers feature flag management with targeted and percentage-based rollouts. Other feature flag services offer more features. Implementing any of the following is a logical next step:

* **Experimentation**: Through the experimentation feature, developers can test how a user’s experience or interaction changes with different, often visual, features. This would involve adding user behavior analytics.  
* **Roles for flag management:** Adding roles, such as administrator and marketing, would give an organization more control over how different members can interact with feature flags.  
* **Flag management audit trail:** An audit mechanism would show who created or toggled flags and when, which may be a useful internal tool.  
* **Technical Debt Display**: Ideally, feature flags are quickly removed from code once the feature has been deemed stable in production and is considered part of the main branch. Being able to display how recently a flag was hit, whether only a single variant of a flag is in use, or how flags are nested are helpful ways to identify where flag technical debt is accumulating and could potentially be removed.

## Improve LightFoot Cloud Deployment

LightFoot removes a lot of work for teams beginning to use feature flags and observability, but it requires effort from the user to deploy in the cloud. Future enhancements would involve automating the setup of the flag management and observability servers on AWS using Terraform. This enables provisioning an entire stack with a single command. 

## Improving LightFoot’s Scalability

**External flag state caching:** Currently, LightFoot stores flag state in the SDK consumer’s application memory to reduce calls to the Evaluation API. An enhancement would be to set up an external cache, like Redis. The external cache can also be scaled as the LightFoot user’s traffic grows. 

## SDK improvements

**Multi-language support:** LightFoot currently only provides a TypeScript SDK. Expanding to include server SDKs for additional programming languages would enable comprehensive observability across polyglot microservice architectures.
`


const futureWork = {
  id: 'future-work',
  label: 'Future Work',
  content
}

export default futureWork;