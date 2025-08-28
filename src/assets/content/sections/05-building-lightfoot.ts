const content = `
# Building LightFoot

## Components of LightFoot

LightFoot is comprised of the following:

* Two SDKs that evaluate feature flags and instrument code for observability on both the backend and frontend  
* A containerized OpenTelemetry collector that is deployed alongside your application and exports your telemetry to backend storage  
* The flag database, which stores flag details and flag evaluation rules  
* The flag evaluation API, which evaluates feature flags by combining the evaluation context with evaluation rules from the database  
* The flag management system, which consists of a frontend and backend server, manages feature flags and displays application observability dashboards  
* The four containerized components of backend telemetry storage and visualization

## Example Deployment
![alt text](/diagrams/5.0-deployment.png)
*Image caption: An example deployment of LightFoot’s architecture with each component hosted on its own server.*

## Implementing with OpenFeature

We decided to implement our feature flag management in compliance with the OpenFeature standard. By using this open-source standard, LightFoot users can easily migrate to other OpenFeature-compliant systems if needed. 

OpenFeature defines a specification with standardized interfaces and behaviors for feature flag systems. To connect specific flag management systems to this standard, providers must be built that implement the OpenFeature provider interface. Providers are responsible for performing flag evaluations and providing an abstraction between the underlying flag management system and the OpenFeature SDK.
![alt text](/diagrams/5.1-open-feature.png)
*Image Caption: A diagram of how OpenFeature works in an application6*

We built a LightFoot provider that implements the OpenFeature provider interface, which we include in our SDKs. The provider handles the translation between OpenFeature's standardized evaluation requests and LightFoot's specific API calls, following the OpenFeature specification guidelines across key areas such as:

* **Flag Evaluation Process**: We implement the required flag evaluation methods for each flag type with proper evaluation context, flag resolution, and error handling.  
* **Context Management**: We transform and pass the evaluation context (currently for user attributes) to our backend system

## Separating Flag Management from Evaluation  
When designing the feature flag portion of LightFoot, we chose to separate the evaluation API from the flag management system’s API. The flag management API reads and writes to the database when the development team is managing flags. The evaluation API reads from the same database to retrieve the flag state for the current evaluation context. This also provides a layer of security by separating the user’s application from LightFoot’s flag database, preventing unauthorized changes to flag data.

Due to the heavier read volume, as the client application scales, the evaluation API will need to scale accordingly. Because the evaluation API is read-only, it can scale with database read replicas for the client application to read.
![alt text](/diagrams/5.2-api.png)
*Image Caption: The application only interacts with the Flag Evaluation API for flag values and does not have access to the flag database or the flag management UI.*

## Flag Caching Considerations

When the client application needs to evaluate feature flags, the simplest solution is to have the evaluation API make a request to the flag database directly each time.   
However, this can add network latency and increase database load as application traffic grows. 

To address this, we implemented a simple in-memory cache in the client application. When an application first evaluates flags, the evaluation results for those flags are fetched from the database and stored. This means future flag evaluations will not need to hit an external API. We implemented a three-minute Time-To-Live (TTL) expiration to trigger refetching of flag values. 

Existing products implement a TTL ranging from one minute to five minutes.⁷,⁸ We chose to use three minutes to balance the freshness of evaluations and the number of database reads due to our expected users having relatively lower traffic. 
![alt text](/diagrams/5.3-evaluation.png)
*Image Caption: An image showing how feature flag evaluation works and where values are stored*

## Implementing with OpenTelemetry

Similar to implementing an open source standard for our feature flag system, we decided to implement the observability portion of our solution using OpenTelemetry. OpenTelemetry can provide instrumentation in various ways. It offers SDKs and libraries that can generate telemetry data manually or automatically. Additionally, OpenTelemetry provides a collector that processes and exports telemetry to observability backends.

LightFoot integrates OpenTelemetry using several components:

* **Instrumentation**: In our SDKs, we implemented OpenTelemetry Node Auto-Instrumentations. We discuss the details of our instrumentation in the SDKs section.   
* **Collector**: We integrate with the OpenTelemetry Collector for centralized telemetry processing and exporting. We discuss the details of our use of the Collector in the Adding a Collector section. 

## Client and Server SDKs

LightFoot includes two TypeScript SDKs for import and use in an application. They provide an interface for evaluating feature flags and automatically enrich and emit telemetry with associated feature flag state. Implementing full-stack feature flag observability required two separate SDKs: a Server SDK to run in [Node.js](http://Node.js) backends and a Client SDK tailored to the browser environment. 

### Evaluating Feature Flags

Both SDKs include a LightFoot provider that implements the OpenFeature provider interface. The provider handles flag evaluations by making calls to LightFoot's Flag Evaluation API. 

The Server SDK handles requests from multiple users, with each evaluation request including a unique user's evaluation context. When a flag is evaluated, the provider first checks if evaluations for that user context are cached and still valid. If not, it makes a call to fetch evaluations for all flags relevant to that user context, caches them, and returns the specific flag's value.

The Client SDK operates differently. In the browser, a single user corresponds to a single instance of the client application. The user context typically remains static unless triggered by events such as login, logout, or profile changes. Therefore, the Client SDK initializes with a static user evaluation context, fetches all relevant flag evaluations for that context, and caches them locally. When the user context does change, the Client SDK refetches and caches flag evaluations for the updated user context.

### Emitting and Enriching Telemetry with Feature Flags

Both SDKs set up automatic instrumentation using libraries from OpenTelemetry to enable consumer applications to emit telemetry without writing any additional code. With instrumentation in place, each incoming request starts a trace composed of spans. These are the spans that will be enriched with feature flag data when flags are evaluated. To enrich telemetry, our provider implements a hook that runs after every flag evaluation to log a custom event on the current span containing the flag key and flag evaluation results.   
![alt text](/diagrams/5.4-server-eval.png)

*Image caption: When a feature flag is evaluated, the current span is enriched with flag state.*

In the browser environment, events and flag evaluation don't always align. Frontend applications are driven by events that don't happen in a predictable sequence, meaning flags can have an impact on spans created long after their evaluation. Second, asynchronous browser events and the React lifecycle often cause the trace API to lose its reference to the active span, making it impossible to reliably fetch the active span at the time of flag evaluation. 
![alt text](/diagrams/5.5-browser-no.png)

*Image caption: On the frontend, related events - such as the creation and clicking of a button - are not both associated with the relevant feature flag state.*

To enrich flags for the Client SDK, we instead implemented a custom SpanProcessor that adds feature flag context to spans as soon as they are created. When a flag is evaluated, the cache is updated with the flag evaluation results. The SpanProcessor then adds all cached evaluations to each span. This ensures that each span receives the relevant flag evaluation data, regardless of when it was created.
![alt text](/diagrams/5.6-browser-enriched.png)
*Image caption: To enrich related events on the frontend, a cache is used to store flag evaluation results when feature flags are encountered. This cache is used to enrich later spans.*

## Adding a Collector

As an application generates telemetry, all the data needs to be exported to a telemetry backend. The easiest option is to send all the data directly to the backend from an application, but as applications scale, so does the telemetry they produce.   
As the volume of emitted telemetry data grows, it may be beneficial to process the data before exporting it to backend storage. Processing can include:

* Transforming data by adding or removing attributes  
* Filtering subsets of data out, or sampling a representative subset of the data  
* Batching, or periodically exporting grouped telemetry

Processing and batching within the application creates a risk that data not yet exported could be lost if the application crashes, including data related to the crash. 

To handle larger volumes of data and process it before it’s exported to the telemetry storage backends, we added an **OpenTelemetry Collector** to the telemetry pipeline. This Collector is deployed alongside applications, collecting host metrics and providing an efficient way for apps to continuously export telemetry. The Collector takes the responsibility of processing and batching the data before exporting it, removing the resource overhead from the application.
![alt text](/diagrams/5.7-pipeline.png)
*Image Caption: Telemetry is emitted from an application to the OpenTelemetry Collector, which then processes, batches, and exports it to backend storage.* 


Eventually, systems can scale to a point at which individual collectors cannot handle the volume of data, especially when it comes in bursts. Adding a load-balancer with a pool of collectors can make pipelines more scalable and resilient. To avoid prematurely introducing complexity, LightFoot does not configure a complex distributed collector architecture. We opted for the simpler local collector architecture to meet the immediate needs of teams setting up their observability infrastructure while being extendable in the future if necessary. 

## Sampling telemetry  

The volume of data generated by an observability system can quickly become very large, which can both overwhelm the pipeline and lead to rapidly escalating costs from network egress. Fortunately, comprehensive observability can be achieved without exporting 100% of the telemetry. **Sampling** and **filtering** are two methods of reducing resource consumption while maintaining the ability to observe the system. Sampling involves selecting a representative subset of data, while filtering selects data that matches specific criteria. 

Balancing these concerns depends on many factors specific to a system and its deployment. It wouldn’t be possible to provide a configuration that would fit every team’s unique needs. We chose not to sample any telemetry by default, which is OpenTelemetry’s recommendation for applications with lower traffic.⁹ As an application grows, teams can introduce sampling by changing the configuration for the OpenTelemetry Collector with the desired sampling method.

## Observability Stack Selection

When designing the backend storage for the OpenTelemetry Collector to export data to, we chose the open-source Grafana stack consisting of:

* **Loki**: a log aggregation system and time-series database for storing logs  
* **Tempo:** a distributed tracing backend for storing and querying traces  
* **Prometheus:** a toolkit designed for scraping and storing metrics  
* **Grafana:** an observability platform for querying and visualizing telemetry

Grafana provides Loki and Tempo for backend storage of logs and traces, and integrates with Prometheus for metrics. The Grafana server can query Prometheus and Tempo via the PromQL and TraceQL query languages, respectively, and provides a single location to explore and visualize logs, metrics, and traces. 

One alternative is the ELK stack (Elasticsearch, Logstash, Kibana). The ELK stack focuses on log management and analysis, but can be extended with other tools to collect distributed traces and metrics

Elasticsearch indexes the full text of every log entry, enabling powerful log search capabilities. Loki, on the other hand, indexes labels, or metadata, associated with log streams, allowing more resource-efficient storage and querying of Loki logs, but less comprehensive log search functionality. Our focus was on visualizing metrics from flag-enriched traces rather than the depth of log search functionality, making the Grafana stack a better choice.¹⁰
![alt text](/diagrams/5.8-grafana.png)
*Image Caption: Our observability dashboard built with the Grafana stack. Grafana visualizations pull data from Loki, Prometheus, and Tempo.*

## Telemetry Backend Architecture 

When implementing our Grafana observability stack, we considered two deployment approaches. We could use separate Dockerfiles for each component (Loki, Prometheus, Tempo, Grafana), enabling independent scaling of each. Alternatively, we could use a single Docker Compose file containing the whole stack in a single configuration, allowing teams to spin up the entire observability stack with one command. We chose the Docker Compose approach, prioritizing simplicity over flexibility. 

## Observability and Monitoring

We provide preconfigured dashboards for observing key performance metrics generated from our feature flag-enriched traces and offer direct access to Grafana for broader observability needs. 

* **Preconfigured Dashboards:** We integrated preconfigured Grafana dashboards into our UI. These dashboards visualize key performance metrics that are generated from our feature flag-enriched traces. We accomplish this using Tempo's TraceQL Metric feature, a specialized query language that transforms raw trace data into meaningful aggregated metrics.  
* **Comprehensive Observability through Grafana’s Interface:** In addition to the above, we also provide direct access to the full Grafana interface, where teams can explore logs, metrics, and traces, configure custom dashboards, monitoring, and alerting, and view more detailed system analysis beyond feature flag performance.

## Determining Which Metrics to Display in our Dashboard

When deciding what panels to preconfigure for our observability dashboards, we sought to provide panels that show how flags impact performance on both the backend and frontend.   
For the backend, we chose to highlight the RED metrics for their ability to capture high-level system performance in terms of user experience.¹¹  RED metrics measure performance by tracking the following:

* **Rate:** the number of requests per second   
* **Errors:** the number of those requests that are failing  
* **Duration:** the amount of time those requests take 

If toggling a feature flag degrades performance by causing more errors or increasing duration, RED metrics will surface that impact, providing a signal to roll back.

For the frontend, we chose to highlight the Core Web Vitals (CWV), a set of standardized metrics from Google that measure three core aspects of user experience: 

* **Largest Contentful Paint (LCP)** measures loading performance by capturing the time it takes for the largest visible element (e.g., image, video, block of text) to render on the screen, providing a clear signal of when the main content has loaded for the user.¹² 
* **Interaction to Next Paint (INP)** measures interactivity by capturing the time between when a user interacts with the page (e.g., clicking, typing, tapping) and when the next frame is rendered, reflecting how quickly the page responds to input.¹³  
* **Cumulative Layout Shift (CLS)** measures visual stability by tracking how much visible content shifts unexpectedly during the page’s lifecycle, indicating whether elements stay in place or jump around as the page loads.¹⁴

These metrics help identify potential problems in user experience and are also used in Google’s page ranking, making them valuable for search engine optimization. 

## Dashboard Implementation

Our dashboard implementation involved several decisions regarding statistical methodology and data organization to provide clear and actionable insights into feature flag performance impacts.

### Percentile Selection

For request rate and error metrics, we track spans per second, where each span represents an individual unit of work within the system (such as a database query, API call, or service interaction). Since a single user request typically generates multiple spans, this metric gives visibility into the total activity and throughput across the system.

For duration measurements, we selected the 95th percentile (P95) of response times. P95 captures the response time threshold that 95% of requests fall below. While P95 doesn't reveal how the faster response times are distributed below that threshold, it serves as an early indicator of performance degradation.

For the Core Web Vitals, we selected P75, aligning with Google's methodology for assessing web performance. The 75th percentile approach ensures that the majority of user visits experience acceptable performance while remaining relatively unaffected by outliers.15  We use a lower percentile value for CWV compared to using P95 for the duration panel because different devices, network connections, and browsers introduce more variability and outliers on the client side.¹⁶

### Grouping and Aggregation

Our dashboards provide two complementary views for performance analysis. One dashboard displays an aggregate baseline alongside individual trend lines grouped by flag key, excluding spans for which the flag variant was falsy. This allows teams to quickly identify which flags correlate with performance changes across the entire system.
![alt text](/diagrams/5.9-by-key.png)
*Image Caption: An example chart of request duration with lines showing aggregate duration as well as duration for two flags*

For deeper investigation, flag-specific dashboards focus on individual flags and group metrics by all of that flag's variants, for example, displaying “on” and “off” variants for a boolean flag. This two-tiered approach enables teams to detect system-wide flag impacts and to drill down to understand how different variants of a specific flag affect performance. This grouping strategy applies to both RED and CWV metrics, providing a systematic framework for flag performance analysis.  
![alt text](/diagrams/5.10-by-variant.png)
*Image Caption: An example graph of request duration for a specific flag, with lines showing duration for each of two variants*
`

const buildingLightfoot = {
  id: 'building-lightfoot',
  label: 'Building LightFoot',
  content
}

export default buildingLightfoot;
