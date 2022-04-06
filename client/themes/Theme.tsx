import { extendTheme } from 'native-base';
import { ShadowProps } from 'react-native-shadow-2';

const LinearGradient = require('expo-linear-gradient').LinearGradient;

export const config = {
	dependencies: {
		'linear-gradient': LinearGradient
	},
	useSystemColorMode: false,
	initialColorMode: 'light'
};

export const ShadowPresets = {
	button: {
		offset: [ 0, 1 ],
		distance: 1,
		startColor: '#0003'
	} as ShadowProps
};

export const theme = extendTheme({
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
		},

		lightBorder: {}
	},

	config: {
		// Changing initialColorMode to 'dark'
		initialColorMode: 'light'
	},
	fontConfig: {
		Jost: {
			300: {
				normal: 'Jost_300Light'
			},
			500: {
				normal: 'Jost_500Medium'
			},
			700: {
				normal: 'Jost_700Bold'
			}
		}
	},

	// Make sure values below matches any of the keys in `fontConfig`
	fonts: {
		heading: 'Jost',
		body: 'Jost',
		mono: 'Jost'
	},

	components: {
		Button: {
			// Can simply pass default props to change default behaviour of components.
			baseStyle: {
				rounded: '2xl'
			},
			defaultProps: {
				size: 'lg',
				shadow: 2,
				variant: 'solid',
				colorScheme: 'primary',
				_text: {
					fontWeight: 700
				}
			}
		},
		Heading: {
			baseStyle: {},
			defaultProps: {
				size: 'xl',
				color: 'black'
			}
		},
		Text: {
			baseStyle: {},
			defaultProps: {
				fontWeight: 700,
				color: 'black'
			}
		}
	},

	shadows: {
		0: {
			shadowColor: 'rgba(0, 0, 1, 0.0)',
			shadowOffset: {
				width: 0,
				height: 0
			},
			shadowOpacity: 0,
			shadowRadius: 0,
			elevation: 0
		},
		1: {
			shadowColor: 'rgba(0, 0, 1, 0.6)',
			shadowOffset: {
				width: 0,
				height: 0
			},
			shadowOpacity: 1,
			shadowRadius: 1.0,
			elevation: 1
		},
		5: {
			shadowColor: 'rgba(0, 0, 1, 0.6)',
			shadowOffset: {
				width: 0,
				height: 0
			},
			shadowOpacity: 1,
			shadowRadius: 1.0,
			elevation: 5
		}
	}
});

type MyThemeType = typeof theme;

declare module 'native-base' {
	interface ICustomTheme extends MyThemeType {}
}
