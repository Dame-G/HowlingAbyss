import defaultTheme from 'tailwindcss/defaultTheme';
/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
	darkMode: ['class'],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#FFF',
					foreground: '#000',
				},
			},
			fontFamily: {
				mono: ['Geist Mono', ...defaultTheme.fontFamily.sans],
				sans: ['Geist Sans', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [
		plugin(({ addUtilities }) => {
			addUtilities({
				'.no-scrollbar': {
					/* IE and Edge */
					'-ms-overflow-style': 'none',

					/* Firefox */
					'scrollbar-width': 'none',

					/* Safari and Chrome */
					'&::-webkit-scrollbar': {
						display: 'none',
					},
				},
			});
		}),
		require('tailwindcss-animate'),
	],
};
