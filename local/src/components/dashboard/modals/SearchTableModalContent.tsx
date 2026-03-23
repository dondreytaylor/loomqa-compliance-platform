import type { ReactNode } from "react";

type Column = {
  key: string;
  label: string;
  wrap?: boolean;
  render?: (value: unknown, row: Record<string, unknown>) => ReactNode;
};

type Props = {
  columns: Column[];
  rows: Array<Record<string, unknown>>;
  query: string;
};

function normalizeText(value: unknown) {
  return (value ?? "").toString().trim();
}

export function SearchTableModalContent({ columns, rows, query }: Props) {
  const q = normalizeText(query).toLowerCase();

  const filtered = rows.filter((row) => {
    const blob = columns
      .map((c) => normalizeText(row[c.key]))
      .join(" ")
      .toLowerCase();
    return !q || blob.includes(q);
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "1",
        minHeight: 0,
      }}
    >
      <div className="modal-scroll" style={{ minHeight: 0 }}>
        <div className="table-wrap" style={{ marginTop: 6 }}>
          <table>
            <thead>
              <tr>
                {columns.map((c) => (
                  <th key={c.key}>{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!filtered.length ? (
                <tr>
                  <td className="wrap" colSpan={columns.length}>
                    No matches. Try a different search term.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr
                    key={columns.map((c) => normalizeText(row[c.key])).join("|") || "row"}
                  >
                    {columns.map((c) => {
                      const value = normalizeText(row[c.key]) || "—";
                      const cls = c.wrap ? "wrap" : "";
                      return (
                        <td key={c.key} className={cls}>
                          {c.render ? c.render(value, row) : value}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
