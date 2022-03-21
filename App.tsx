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
import { theme, config } from './themes/Theme';

export default function App() {
	return (
		<NativeBaseProvider config={config} theme={theme}>
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
