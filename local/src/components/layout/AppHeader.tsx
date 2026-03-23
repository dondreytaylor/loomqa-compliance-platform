/**
 * App header (server component).
 *
 * This component is intentionally presentational: no hooks, no client-side JS.
 * That keeps the default experience fully server-rendered.
 */

import styles from "./AppHeader.module.css";

type AppHeaderProps = {
  title: string;
  subtitle: string;
};

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </header>
  );
}
