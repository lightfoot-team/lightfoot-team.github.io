const content = `
# Background

## What are Feature Flags?

A **feature** is a name for a distinct piece of functionality in a codebase. **Feature flags** are a way to control what features are active. They are also known as feature toggles, flippers, or switches. Feature flags return true or false values for conditionals that determine whether the feature will be executed. Flags can also hold different values, such as strings for more complex configurations, where values are used to choose among several conditional branches.¹

A key insight here is that feature flags are **evaluated dynamically at runtime**. The deployed code remains the same whether a feature is turned on or off. This is one of the powers of feature flags: they decouple the deployment of code from feature releases. New features can be constantly deployed behind a flag that is only toggled on when the feature is ready. Wrapping functionality in a feature flag means that if the application does not perform as expected with the feature on, it can simply be toggled off to revert to the previous, working version of the application without the need to rebuild and redeploy the code.¹⁰
![alt text](/diagrams/2.0-flags.png)
*Image Caption: Feature flags are used to dynamically alter an application at runtime and are separate from code deployment¹⁰

To benefit from the flexibility of runtime evaluation, a **feature flag management service** is required. Feature flag management services handle flag evaluation and provide a platform for setting up and maintaining flags. With a management service, feature flags consist of a **flag key** (a unique identifier) and **flag variants** (the possible values the flag can return). 

![alt text](/diagrams/2.1-flag-state.png)

*Image caption: an example feature flag with two variants, “On” and “Off”, which correspond to true and false values.*

To evaluate a feature flag, the management service uses **evaluation context**. Evaluation context is the information about the current request, such as user ID, location, or device type, that is passed along when a flag is evaluated. This context then interacts with predefined **rules** to determine which variant to return. Rules could be “show new feature for only administrators” or “display this homepage for 25% of all users ”. These rules can be updated in real-time through the management service without requiring code changes or redeployments.

![alt text](/diagrams/2.2-evaluation.png)

*Image caption: A sample evaluation context and rule*

It is the combination of evaluation context and rules that enables several important use cases for feature flags beyond simple on/off toggles:

* **Experimentation**: Running A/B tests by serving different variants to different user segments  
* **Percentage-based rollouts**: Gradually releasing features to a percentage of users to monitor performance and catch issues early  
* **Targeted releases**: Enabling features for specific user groups based on location, device type, subscription level, or other criteria

Feature flag management services allow developers to focus on using flags and managing their application without needing to build out the infrastructure or code to manage the flags themselves.

## What is Observability?

**Observability** is the ability to understand what is happening in a system. An observable software system enables developers to identify and react to any condition or behavior that might arise, even unanticipated conditions. 

The data that forms the foundation of observability is collectively known as **telemetry.** Telemetry is often categorized into three signals: logs, metrics, and traces. **Logs** are messages that describe a single event or a snapshot of time within an application, such as an error being logged when a connection fails. **Metrics** are aggregations of individual data points to track the state of a system, such as a number indicating total resource usage at a given point in time. **Traces** encapsulate information about a series of related units of work across a distributed system. The discrete units that compose a trace are known as **spans.**  
![alt text](/diagrams/2.3-span.png)
*Image Caption: A sample span with three attributes.*

Each of these signals can provide some information about a system in isolation, but observing modern software systems requires correlating multiple signals. The high-level representation of a system built from correlated telemetry helps show how an individual event relates to the overall state. That connection is what enables developers to understand what is happening in their system and respond appropriately.

## The Intersection of Feature Flags and Observability

Feature flags and observability are often used together when deploying new functionality to production. Feature flags provide the ability to enable features in production and disable them if they are problematic. Observability provides the visibility to identify when issues occur. When these systems operate independently, it can be difficult to determine which flags influenced which system behavior. Understanding which flags were encountered, enabled, and how they affected requests and overall system health is a useful tool.

**Flag-enriched telemetry** addresses this by adding feature flag state, which includes feature flag key and variant, directly into telemetry. Linking feature flags and system behavior enables faster and more precise debugging, making for safer rollouts.

![alt text](/diagrams/2.4-enriched.png)

*Image Caption: A span enriched with feature flag state.*

## Open Source Standards

Now that we understand feature flags and observability, it is worth discussing some open source standards and tools with widespread and growing industry adoption.¹⁶

**OpenFeature** is an open-source, Cloud Native Computing Foundation standard and software development kit (SDK). OpenFeature defines an API for feature flag evaluation and a specification for how to implement feature flag providers. With this standard API, developers could switch from one feature flag management system to another with minimal changes to their application code. 

**OpenTelemetry** is an open-source, Cloud Native Computing Foundation vendor-neutral standard and toolkit for telemetry instrumentation: the collecting, processing, and exporting of logs, metrics, and traces from an application. OpenTelemetry standardizes how telemetry data is described and transmitted to storage backends (e.g., Prometheus, Loki, Datadog). OpenTelemetry is widely adopted for observability with numerous tools for instrumentation in many languages.
`
const background = {
  id: 'background',
  label: 'Background',
  content
}
export default background;