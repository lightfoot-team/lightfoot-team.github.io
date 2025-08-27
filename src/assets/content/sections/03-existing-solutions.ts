const content = `
# Existing Solutions

There are many commercial products and open-source projects that provide feature flag management. Some of these are compliant with OpenFeature standards, enabling easier transitions between providers. Some solutions focus solely on feature flag management, while others also provide observability integration with an additional vendor.

We explored many tools and products in this domain and selected a few that combine flag management and observability offerings.
## Open Source Solutions

**Unleash** is an open-source feature flag management system. It can integrate with a user’s chosen observability platform and be configured to emit enriched telemetry, but this is not provided out of the box. It offers limited OpenFeature-compliant support, specific to JavaScript environments.

## Managed Services

**LaunchDarkly** is a managed service that provides feature flag management. LaunchDarkly is one of the more expensive but also more comprehensive feature flag services, offering management, experimentation, percentage rollouts, and full integration with observability and monitoring platforms. This observability integration includes flag-enriched telemetry as well as additional features such as guarded rollouts. This integration is not part of the base feature flag service and is only available at a higher price point.

## Tradeoffs

Many open-source tools provide feature flag management, but require extra work from the user to emit flag-enriched telemetry. Open source feature flag managers don’t provide telemetry storage or visualization. They rely on users to set up third-party integrations to achieve full observability. A user must also set up the necessary infrastructure to host their flag management system and connect it with their application. This means extra work, but also full control of the system and data ownership.

Managed services offer technical support, reliability, and many advanced feature flag capabilities. Managed services also remove the need to set up and manage infrastructure for either flag management or observability, at the cost of data ownership. These benefits come at a higher price point.
`

const existingSolutions = {
  id: 'existing-solutions',
  label: 'Existing Solutions',
  content
}
export default existingSolutions;