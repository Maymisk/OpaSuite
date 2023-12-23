import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					'0%': {
						opacity: '0',
						transform: 'translateY(-2px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				fadeOut: {
					'0%': {
						opacity: '1',
						transform: 'translateY(-2px)',
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(0)',
					},
				},
			},
			animation: {
				fadeIn: 'fadeIn 0.2s ease-in-out',
				fadeOut: 'fadeOut 0.2s ease-in-out',
			},

			colors: {
				white: '#EDE8FF',

				gray100: '#7c8a91',
				gray400: '#38343c',
				gray500: '#313338',
				gray600: '#2b2d31',

				purple500: '#6064f4',
				green500: '#23a55a',

				danger: '#e0393f',
			},
		},
	},
	plugins: [],
};
export default config;
