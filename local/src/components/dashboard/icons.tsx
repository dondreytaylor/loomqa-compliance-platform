/**
 * Inline SVG icons used across the dashboard.
 *
 * Keeping these in a single file makes the UI components much easier to read
 * (the JSX stays focused on layout, not long SVG paths).
 */

import type { ReactElement } from "react";

type IconProps = {
  /** Accessible label; when omitted we mark the icon as decorative. */
  title?: string;
};

function Svg({
  title,
  children,
}: {
  title?: string;
  children: ReactElement | ReactElement[];
}) {
  // We keep icons 16x16 to match the reference design.
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export const Icons = {
  Dashboard: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <path
        d="M4 13h7V4H4v9Zm9 7h7V4h-7v16ZM4 20h7v-5H4v5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  Reports: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <path
        d="M7 4h10M7 8h10M7 12h10M7 16h7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M5 4h.01M5 8h.01M5 12h.01M5 16h.01"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </Svg>
  ),

  Frameworks: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <rect
        x="4"
        y="6"
        width="16"
        height="4"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect
        x="4"
        y="14"
        width="16"
        height="4"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </Svg>
  ),

  Controls: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M9 12h6M12 9v6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </Svg>
  ),

  Policies: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <path
        d="M8 4h6l4 4v12H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M14 4v4h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  Tasks: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <path
        d="M8 7h11M8 12h11M8 17h11"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="5" cy="7" r="1.6" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="5" cy="12" r="1.6" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="5" cy="17" r="1.6" stroke="currentColor" strokeWidth="1.7" />
    </Svg>
  ),

  Documents: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <path
        d="M7 5h7l4 4v10H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M14 5v4h4M9 13h6M9 16h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </Svg>
  ),

  Monitor: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <path
        d="M5 15 9 11l3 3 7-8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 19h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </Svg>
  ),

  Integrations: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <path
        d="M8 12h8M12 8v8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <rect
        x="4"
        y="4"
        width="6"
        height="6"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect
        x="14"
        y="4"
        width="6"
        height="6"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect
        x="4"
        y="14"
        width="6"
        height="6"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect
        x="14"
        y="14"
        width="6"
        height="6"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </Svg>
  ),

  Risk: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <path
        d="M12 4 5 7v5c0 4.4 3.1 7.8 7 8 3.9-.2 7-3.6 7-8V7l-7-3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 12.5 11.2 14 14.8 10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  Forms: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M10 9h4M10 12h4M10 15h2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </Svg>
  ),

  Vendors: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <path d="M4 7h16v10H4z" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M8 7V5h8v2M8 17h8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </Svg>
  ),

  Participants: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M4.5 18c.7-2.6 2.6-4 5.5-4s4.8 1.4 5.5 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M14.5 17c.5-1.7 1.8-2.7 3.7-2.7 1.4 0 2.4.5 3.3 1.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </Svg>
  ),

  Settings: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <path
        d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </Svg>
  ),

  Help: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 16v-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 8h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </Svg>
  ),

  External: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <path
        d="M14 5h5v5M10 14 19 5M5 7v12h12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  Menu: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </Svg>
  ),

  Search: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M20 20l-4.2-4.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </Svg>
  ),

  Bell: (props: IconProps = {}) => (
    <Svg title={props.title}>
      <path
        d="M15 17H9c-1.6 0-3-1.3-3-3v-3c0-3.3 2.7-6 6-6s6 2.7 6 6v3c0 1.7-1.4 3-3 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M10 19a2 2 0 0 0 4 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </Svg>
  ),

  ChevronDown: () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M3 5L6 8L9 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
} as const;
