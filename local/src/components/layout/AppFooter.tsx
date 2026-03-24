/**
 * App footer (server component).
 *
 * The footer is a good home for low-frequency links and build-time info.
 * Keeping it as a server component avoids shipping extra JS.
 */

import { ExternalLink } from "../ui/ExternalLink";
import styles from "./AppFooter.module.css";

type AppFooterProps = {
  repoUrl: string;
};

export function AppFooter({ repoUrl }: AppFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span className={styles.muted}>© {year} LoopQA</span>
      <ExternalLink href={repoUrl}>Repository</ExternalLink>
    </footer>
  );
}
