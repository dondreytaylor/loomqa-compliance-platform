/**
 * Global, environment-driven UI state.
 *
 * This is intentionally server-driven so every route can be forced into the
 * same mode for demos (loading / empty / errored) without changing each page.
 */

export type GlobalUiState = "NORMAL" | "LOADING" | "EMPTY_DATA" | "ERRORED";

function normalizeEnv(value: unknown) {
  return (value ?? "").toString().trim().toUpperCase();
}

export function getGlobalUiState(): GlobalUiState {
  const raw = normalizeEnv(process.env.LOOPQA_UI_STATE);

  if (!raw) return "NORMAL";

  switch (raw) {
    case "NORMAL":
      return "NORMAL";
    case "LOADING":
      return "LOADING";
    case "EMPTY_DATA":
    case "EMPTY":
      return "EMPTY_DATA";
    case "ERRORED":
    case "ERROR":
    case "ERRORS":
      return "ERRORED";
    default:
      return "NORMAL";
  }
}
