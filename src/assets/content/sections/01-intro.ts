const content = `
# Introduction

LightFoot is an open source feature flag management platform with out-of-the-box, feature flag-enriched observability and data visualization. It enables development teams to practice safer rollouts with feature flags while observing how those flags affect application performance. 
![alt text](/diagrams/1.0-overview.png)
*Image Caption: A high-level overview of what LightFoot adds to your application*

This case study explores the domains of feature flags and observability, the challenges of integrating the two, and LightFoot's approach to addressing those challenges. It provides a close look at LightFoot's architecture and a discussion of engineering challenges and key implementation decisions.
`
const intro = {
  id: 'introduction',
  label: 'Introduction',
  content
}
export default intro;