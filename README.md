![LoopQA banner](_readme-assets/banner.png)

# Compliance Platform

This repo contains LoopQA’s compliance dashboard concept in two implementations:

- a **local** web app for rapid UI iteration
- a **ServiceNow** (Now Experience) app to validate the same UX patterns in-platform

## Folder overview

### [local](local/)

The local app is a Next.js-based prototype used to iterate quickly on layout, navigation, and overall dashboard UX across multiple pages.

![Local demo](_readme-assets/local-demo.gif)

### [servicenow](servicenow/now-experience/)

The ServiceNow app is a Now Experience implementation (UI Framework) used to bring the same dashboard concept into the ServiceNow ecosystem, including local development, build, and deploy workflows.

![ServiceNow demo](_readme-assets/servicenow-demo.gif)

## Design (Figma)

Primary design file:

- https://www.figma.com/design/Pkznx55LFsoWm2QLKVGMTk/LoopQA?node-id=0-1&t=4B3dqukvqpHQ2TIR-1

## Inspiration & approach

The UI direction was assembled from a handful of sources—Dribbble explorations, existing compliance/GRC product sites, and additional creative concept work—then expanded into a cohesive compliance dashboard with multiple supporting pages.

The goal was to keep the visuals modern and information-dense while still feeling navigable: clear hierarchy, modular cards/grids, and consistent page scaffolding that can scale to more modules.

## AI usage

AI tools were used throughout the project to accelerate delivery:

- **Project scaffolding:** speeding up the initial structure for both the local app and the ServiceNow/Now Experience app.
- **Design acceleration:** helping generate and iterate on early layout ideas and variations in Figma.
- **Debugging + tests:** assisting with debugging workflow issues and drafting/refining various unit tests.

AI was also imperfect in a few areas:

- **Design refinements:** it was less reliable for fine-grained visual polish and consistency work compared to manual iteration.
- **Deploy/config pitfalls:** it occasionally introduced incorrect URLs and configuration assumptions that led to failed deployments to a ServiceNow instance until those settings were corrected.
