import { extendTheme } from 'native-base';

const LinearGradient = require('expo-linear-gradient').LinearGradient;

export const config = {
	dependencies: {
		'linear-gradient': LinearGradient
	},
	useSystemColorMode: false,
	initialColorMode: 'light'
};

export const theme = extendTheme({
	gradient: {
		start: '#5D429D',
		end: '#28BDD7'
	},

	colors: {
		// Add new color
		primary: {
			50: '#E3F2F9',
			100: '#C5E4F3',
			200: '#A2D4EC',
			300: '#7AC1E4',
			400: '#47A9DA',
			500: '#0088CC',
			600: '#007AB8',
			700: '#006BA1',
			800: '#005885',
			900: '#003F5E'
		}
	},
	config: {
		// Changing initialColorMode to 'dark'
		initialColorMode: 'light'
	}
});

type MyThemeType = typeof theme;

declare module 'native-base' {
	interface ICustomTheme extends MyThemeType {}
}
