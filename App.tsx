import React from 'react';
import {
	Text,
	HStack,
	Switch,
	Center,
	useColorMode,
	NativeBaseProvider,
	extendTheme,
	VStack,
	Box,
	Code
} from 'native-base';
import NativeBaseIcon from './components/NativeBaseIcon';
import { SignUp } from './screens/SignUp';

const LinearGradient = require('expo-linear-gradient').LinearGradient;

// Define the config
const config = {
	dependencies: {
		'linear-gradient': LinearGradient
	},
	useSystemColorMode: false,
	initialColorMode: 'light'
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module 'native-base' {
	interface ICustomTheme extends MyThemeType {}
}
function Example() {
	return (
		<NativeBaseProvider config={config}>
			<Center flex={1}>
				<SignUp />
			</Center>
		</NativeBaseProvider>
	);
}

export default function App() {
	return (
		<NativeBaseProvider config={config}>
			<Center flex={1}>
				<SignUp />
			</Center>
		</NativeBaseProvider>
	);
}

// Color Switch Component
function ToggleDarkMode() {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<HStack space={2} alignItems="center">
			<Text>Dark</Text>
			<Switch
				isChecked={colorMode === 'light'}
				onToggle={toggleColorMode}
				aria-label={colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'}
			/>
			<Text>Light</Text>
		</HStack>
	);
}
