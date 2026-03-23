import type { ReactNode } from "react";

import { headers } from "next/headers";

import { getGlobalUiState } from "../../lib/uiState";
import { GlobalUiStateScreen } from "./GlobalUiStateScreen";

function parsePathname(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value, "http://localhost").pathname;
  } catch {
    return null;
  }
}

export async function GlobalUiStateGate({ children }: { children: ReactNode }) {
  const uiState = getGlobalUiState();

  if (uiState === "NORMAL") return children;

  const headerList = await headers();
  const pathnameCandidate =
    headerList.get("x-loomqa-pathname") ??
    parsePathname(headerList.get("next-url")) ??
    parsePathname(headerList.get("x-nextjs-rewritten-path")) ??
    "/";

  const pathname = pathnameCandidate.startsWith("/_next/") ? "/" : pathnameCandidate;

  return <GlobalUiStateScreen uiState={uiState} activeHref={pathname} />;
}
