/**
 * Next.js metadata lives best in one place.
 *
 * Layouts/pages can re-export this so the browser title/description and the
 * on-screen title stay aligned.
 */

import type { Metadata } from "next";

import { appConfig } from "./appConfig";

export const metadata: Metadata = {
  title: `Dashboard · ${appConfig.productName}`,
  description: appConfig.productDescription,
};
