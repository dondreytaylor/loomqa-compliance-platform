/**
 * A tiny wrapper for external links.
 *
 * Why have a component for this?
 * - Keeps security attributes consistent (`rel="noopener noreferrer"`).
 * - Makes it obvious in code review which links leave the app.
 */

import type { ReactNode } from "react";

type ExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
