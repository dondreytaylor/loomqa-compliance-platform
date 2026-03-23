/**
 * A small, reusable page shell.
 *
 * This keeps app pages focused on content/behavior rather than repeating
 * layout markup.
 */

import type { ReactNode } from "react";

import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";
import styles from "./PageShell.module.css";

type PageShellProps = {
  title: string;
  subtitle: string;
  repoUrl: string;
  children: ReactNode;
};

export function PageShell({ title, subtitle, repoUrl, children }: PageShellProps) {
  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <AppHeader title={title} subtitle={subtitle} />
        <main className={styles.main}>{children}</main>
        <AppFooter repoUrl={repoUrl} />
      </div>
    </div>
  );
}
