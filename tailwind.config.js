/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				jeeves: {
					50: '#EFEFF0',
					100: '#DFE0E1',
					200: '#C0C1C4',
					300: '#A0A2A6',
					400: '#808389',
					500: '#64666B',
					600: '#4F5054',
					700: '#3B3C3F',
					800: '#27282A',
					900: '#141415',
					950: '#0A0A0B'
				},
				desert: {
					50: '#FEFDF1',
					100: '#FCF9DE',
					200: '#FAF4BD',
					300: '#F7EE9B',
					400: '#F5E97A',
					500: '#F2E359',
					600: '#F0DD38',
					700: '#EDD817',
					800: '#D3C010',
					900: '#685F08',
					950: '#342F04'
				},
				sierras: {
					50: '#F1FAFE',
					100: '#DEF3FC',
					200: '#BDE7FA',
					300: '#9CDCF7',
					400: '#7BD0F4',
					500: '#5EC6F2',
					600: '#3DBAF0',
					700: '#1CAEED',
					800: '#1198D4',
					900: '#084B68',
					950: '#042634'
				},
				norcal: {
					50: '#FEF3F1',
					100: '#FCE4DE',
					200: '#FAC8BD',
					300: '#F7AD9C',
					400: '#F4917B',
					500: '#F27A5E',
					600: '#F05E3D',
					700: '#ED431C',
					800: '#D43511',
					900: '#681A08',
					950: '#340D04'
				},
				cascades: {
					50: '#E8FDED',
					100: '#D1FADB',
					200: '#9EF5B4',
					300: '#70F090',
					400: '#3DEB69',
					500: '#17DE49',
					600: '#12AB38',
					700: '#0D7D29',
					800: '#084C19',
					900: '#04250C',
					950: '#021206'
				},
				end: {
					50: '#F3EDF3',
					100: '#E7DAE7',
					200: '#CCB3CC',
					300: '#B48EB4',
					400: '#9B699B',
					500: '#744E74',
					600: '#503550',
					700: '#281B28',
					800: '#030203',
					900: '#030203',
					950: '#000000'
				}
			}
		},
		fontFamily: {
			display: ['Montserrat', 'sans-serif'],
			body: ['Merriweather', 'serif']
		}
	},
	plugins: []
};
