/**
 * Route segment: `/`
 *
 * Keep this file tiny. The goal is to make routing obvious and keep page
 * composition inside `src/components/pages/*`.
 */

import { DashboardPage } from "../components/dashboard/DashboardPage";
import { GlobalUiStateScreen } from "../components/platform/GlobalUiStateScreen";
import { getGlobalUiState } from "../lib/uiState";

export default function Page() {
  const uiState = getGlobalUiState();
  if (uiState !== "NORMAL") {
    return <GlobalUiStateScreen uiState={uiState} activeHref="/" />;
  }

  return <DashboardPage />;
}
