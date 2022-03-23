import React from 'react';
import { Text, HStack, Switch, Center, useColorMode, NativeBaseProvider } from 'native-base';
import NativeBaseIcon from './components/NativeBaseIcon';
import { SignUp } from './screens/SignUp';
import { theme, config } from './themes/Theme';
import { useFonts, Jost_300Light, Jost_500Medium, Jost_700Bold } from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([ 'NativeBase:' ]);

export default function App() {
	let [ fontsLoaded ] = useFonts({
		Jost_300Light,
		Jost_500Medium,
		Jost_700Bold
	});

	return fontsLoaded ? (
		<NativeBaseProvider config={config} theme={theme}>
			<Center flex={1}>
				<SignUp />
			</Center>
		</NativeBaseProvider>
	) : (
		<AppLoading />
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
