/*
 * Inline SVG icon set.
 *
 * Ported from the local Next.js dashboard icon set so the Now Experience UI can
 * match the reference layout and spacing closely.
 */

function Svg({title, children}) {
	return (
		<svg
			attrs={{
				viewBox: '0 0 24 24',
				fill: 'none'
			}}
			aria-hidden={title ? undefined : true}
			role={title ? 'img' : undefined}
		>
			{title ? <title>{title}</title> : null}
			{children}
		</svg>
	);
}

export const Icons = {
	LogoMark: ({title} = {}) => (
		<Svg title={title}>
			<path
				attrs={{
					d: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z',
					stroke: 'currentColor',
					'stroke-width': '2',
					'stroke-linecap': 'round',
					'stroke-linejoin': 'round'
				}}
			/>
			<path
				attrs={{
					d: 'm12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z',
					stroke: 'currentColor',
					'stroke-width': '2',
					'stroke-linecap': 'round',
					'stroke-linejoin': 'round'
				}}
			/>
			<path
				attrs={{
					d: 'M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0',
					stroke: 'currentColor',
					'stroke-width': '2',
					'stroke-linecap': 'round',
					'stroke-linejoin': 'round'
				}}
			/>
			<path
				attrs={{
					d: 'M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5',
					stroke: 'currentColor',
					'stroke-width': '2',
					'stroke-linecap': 'round',
					'stroke-linejoin': 'round'
				}}
			/>
		</Svg>
	),
	ChevronDown: ({title} = {}) => (
		<Svg title={title}>
			<path
				attrs={{
					d: 'M6 9l6 6 6-6',
					stroke: 'currentColor',
					'stroke-width': '1.8',
					'stroke-linecap': 'round',
					'stroke-linejoin': 'round'
				}}
			/>
		</Svg>
	),
	Menu: ({title} = {}) => (
		<Svg title={title}>
			<path attrs={{d: 'M4 7h16', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round'}} />
			<path attrs={{d: 'M4 12h16', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round'}} />
			<path attrs={{d: 'M4 17h16', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round'}} />
		</Svg>
	),
	Search: ({title} = {}) => (
		<Svg title={title}>
			<circle attrs={{cx: '11', cy: '11', r: '6', stroke: 'currentColor', 'stroke-width': '1.7'}} />
			<path attrs={{d: 'M20 20l-3.5-3.5', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round'}} />
		</Svg>
	),
	Bell: ({title} = {}) => (
		<Svg title={title}>
			<path attrs={{d: 'M18 16H6c1.2-1.2 2-2.3 2-5a4 4 0 0 1 8 0c0 2.7.8 3.8 2 5Z', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linejoin': 'round'}} />
			<path attrs={{d: 'M10 18a2 2 0 0 0 4 0', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round'}} />
		</Svg>
	),
	Risk: ({title} = {}) => (
		<Svg title={title}>
			<path attrs={{d: 'M12 4 5 7v5c0 4.4 3.1 7.8 7 8 3.9-.2 7-3.6 7-8V7l-7-3Z', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linejoin': 'round'}} />
			<path attrs={{d: 'M9.5 12.5 11.2 14 14.8 10', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'}} />
		</Svg>
	),

	// Sidebar section icons
	Dashboard: ({title} = {}) => (
		<Svg title={title}>
			<path attrs={{d: 'M4 13h7V4H4v9Zm9 7h7V4h-7v16ZM4 20h7v-5H4v5Z', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linejoin': 'round'}} />
		</Svg>
	),
	Reports: ({title} = {}) => (
		<Svg title={title}>
			<path attrs={{d: 'M7 4h10M7 8h10M7 12h10M7 16h7', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round'}} />
			<path attrs={{d: 'M5 4h.01M5 8h.01M5 12h.01M5 16h.01', stroke: 'currentColor', 'stroke-width': '2.2', 'stroke-linecap': 'round'}} />
		</Svg>
	),
	Frameworks: ({title} = {}) => (
		<Svg title={title}>
			<rect attrs={{x: '4', y: '6', width: '16', height: '4', rx: '2', stroke: 'currentColor', 'stroke-width': '1.7'}} />
			<rect attrs={{x: '4', y: '14', width: '16', height: '4', rx: '2', stroke: 'currentColor', 'stroke-width': '1.7'}} />
		</Svg>
	),
	Controls: ({title} = {}) => (
		<Svg title={title}>
			<rect attrs={{x: '5', y: '5', width: '14', height: '14', rx: '3', stroke: 'currentColor', 'stroke-width': '1.7'}} />
			<path attrs={{d: 'M9 12h6M12 9v6', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round'}} />
		</Svg>
	),
	Policies: ({title} = {}) => (
		<Svg title={title}>
			<path attrs={{d: 'M8 4h6l4 4v12H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linejoin': 'round'}} />
			<path attrs={{d: 'M14 4v4h4', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linejoin': 'round'}} />
		</Svg>
	),
	Tasks: ({title} = {}) => (
		<Svg title={title}>
			<path attrs={{d: 'M8 7h11M8 12h11M8 17h11', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round'}} />
			<circle attrs={{cx: '5', cy: '7', r: '1.6', stroke: 'currentColor', 'stroke-width': '1.7'}} />
			<circle attrs={{cx: '5', cy: '12', r: '1.6', stroke: 'currentColor', 'stroke-width': '1.7'}} />
			<circle attrs={{cx: '5', cy: '17', r: '1.6', stroke: 'currentColor', 'stroke-width': '1.7'}} />
		</Svg>
	),
	Documents: ({title} = {}) => (
		<Svg title={title}>
			<path attrs={{d: 'M7 5h7l4 4v10H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linejoin': 'round'}} />
			<path attrs={{d: 'M14 5v4h4M9 13h6M9 16h4', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round'}} />
		</Svg>
	),
	Monitor: ({title} = {}) => (
		<Svg title={title}>
			<path attrs={{d: 'M5 15 9 11l3 3 7-8', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'}} />
			<path attrs={{d: 'M4 19h16', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round'}} />
		</Svg>
	),
	Integrations: ({title} = {}) => (
		<Svg title={title}>
			<path attrs={{d: 'M8 12h8M12 8v8', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round'}} />
			<rect attrs={{x: '4', y: '4', width: '6', height: '6', rx: '2', stroke: 'currentColor', 'stroke-width': '1.7'}} />
			<rect attrs={{x: '14', y: '4', width: '6', height: '6', rx: '2', stroke: 'currentColor', 'stroke-width': '1.7'}} />
			<rect attrs={{x: '4', y: '14', width: '6', height: '6', rx: '2', stroke: 'currentColor', 'stroke-width': '1.7'}} />
			<rect attrs={{x: '14', y: '14', width: '6', height: '6', rx: '2', stroke: 'currentColor', 'stroke-width': '1.7'}} />
		</Svg>
	),
	Forms: ({title} = {}) => (
		<Svg title={title}>
			<circle attrs={{cx: '12', cy: '12', r: '8', stroke: 'currentColor', 'stroke-width': '1.7'}} />
			<path attrs={{d: 'M10 9h4M10 12h4M10 15h2', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round'}} />
		</Svg>
	),
	Vendors: ({title} = {}) => (
		<Svg title={title}>
			<path attrs={{d: 'M4 7h16v10H4z', stroke: 'currentColor', 'stroke-width': '1.7'}} />
			<path attrs={{d: 'M8 7V5h8v2M8 17h8', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round'}} />
		</Svg>
	),
	Participants: ({title} = {}) => (
		<Svg title={title}>
			<circle attrs={{cx: '9', cy: '8', r: '3', stroke: 'currentColor', 'stroke-width': '1.7'}} />
			<path attrs={{d: 'M4.5 20c.6-3.2 2.8-5 5.2-5s4.6 1.8 5.2 5', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round'}} />
			<circle attrs={{cx: '17', cy: '10', r: '2.4', stroke: 'currentColor', 'stroke-width': '1.7'}} />
			<path attrs={{d: 'M15.3 20c.3-2 1.5-3.2 2.7-3.2 1.2 0 2.4 1.2 2.7 3.2', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round'}} />
		</Svg>
	),
	Settings: ({title} = {}) => (
		<Svg title={title}>
			<path attrs={{d: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z', stroke: 'currentColor', 'stroke-width': '1.7'}} />
			<path attrs={{d: 'M19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.4.9a7.2 7.2 0 0 0-1.7-1l-.4-2.6H9.6L9.2 5.9a7.2 7.2 0 0 0-1.7 1L5.1 6 3.1 9.4 5.1 11c-.1.3-.1.7-.1 1s0 .7.1 1l-2 1.6 2 3.4 2.4-.9c.5.4 1.1.7 1.7 1l.4 2.6h4.8l.4-2.6c.6-.3 1.2-.6 1.7-1l2.4.9 2-3.4-2-1.6c.1-.3.1-.7.1-1Z', stroke: 'currentColor', 'stroke-width': '1.2', 'stroke-linejoin': 'round'}} />
		</Svg>
	),
	Help: ({title} = {}) => (
		<Svg title={title}>
			<circle attrs={{cx: '12', cy: '12', r: '9', stroke: 'currentColor', 'stroke-width': '1.7'}} />
			<path attrs={{d: 'M9.5 9.5a2.6 2.6 0 0 1 5.1.7c0 1.5-1.5 2.2-2.1 2.6-.5.3-.7.6-.7 1.7', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round'}} />
			<path attrs={{d: 'M12 17h.01', stroke: 'currentColor', 'stroke-width': '2.2', 'stroke-linecap': 'round'}} />
		</Svg>
	),
	External: ({title} = {}) => (
		<Svg title={title}>
			<path attrs={{d: 'M14 5h5v5', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'}} />
			<path attrs={{d: 'M10 14 19 5', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'}} />
			<path attrs={{d: 'M19 14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4', stroke: 'currentColor', 'stroke-width': '1.7', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'}} />
		</Svg>
	)
};
