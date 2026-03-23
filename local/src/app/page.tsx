/**
 * Route segment: `/`
 *
 * Keep this file tiny. The goal is to make routing obvious and keep page
 * composition inside `src/components/pages/*`.
 */

import { DashboardPage } from "../components/dashboard/DashboardPage";

export default function Page() {
  return <DashboardPage />;
}
