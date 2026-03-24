![LoopQA banner](_readme-assets/banner.png)

# Compliance Platform

This repo contains LoopQA’s compliance dashboard concept in two implementations:

- a **local** web app for rapid UI iteration
- a **ServiceNow** (Now Experience) app to validate the same UX patterns in-platform

<a href="https://youtu.be/APKN7o-LY6M" target="_blank">Watch Demo</a>

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

## Assumptions/Major Tradeoffs

I made various assumptions as I was creating this, for example I assumed that the entire application should be one to one with service now from a UI perspective which isn't necessairly the case. I also had various options to how this could have been implemented in Service Now, for example: Next UI Experience, Service Portal, or through Service Now's API.  

For simplicity I chose to implement the dashboard page using the Next UI and added the dashboard as a single component. Alternatively, I could have further broken up the dashboard into various components, deployed that to ServiceNow and then used ServiceNow's UI Builder to construct the components directly. 

There are a ton of tradeoffs that needed to be made, for example managing the UI in ServiceNow directly versus through code. There are pros and cons to both approach, especially as the team scales. 

## Next Time/Future Additions

I would have loved to have more time to implement the page as seperate ServiceNow Next components rather than use the entire page as a component. I also would have like to hook into the ServiceNow MariaDB to actually pull and push data to/from ServiceNow. Lastly, add in some more unit tests. 
