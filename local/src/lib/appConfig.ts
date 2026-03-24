/**
 * Central, typed configuration for the LoopQA Platform web app.
 *
 * Keep values here (instead of sprinkling them across components) so:
 * - the UI stays consistent
 * - metadata stays in sync with headings
 * - future changes are one-file edits
 */

export const appConfig = {
  /** Human-friendly product name shown in the UI. */
  productName: "LoopQA",

  /** Short description used on the homepage and in metadata. */
  productDescription:
    "Track integrity posture, audit readiness, recent drift, and the next remediation steps across controls, frameworks, and integrated systems.",

  /** Repo URL (used for links; update if it changes). */
  repoUrl: "https://github.com/dondreytaylor/LoopQA-compliance-platform.git",

  /** Default port we expose in Docker and locally. */
  port: 3000,
} as const;
