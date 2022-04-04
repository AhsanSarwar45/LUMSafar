import React, { useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import { AccountType } from './screens/AccountType';
import { SignUp } from './screens/SignUp';
import { Verification } from './screens/Verification';
import { Login } from './screens/Login';
import { theme, config } from './themes/Theme';
import { useFonts, Jost_300Light, Jost_500Medium, Jost_700Bold } from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
	let [ fontsLoaded ] = useFonts({
		Jost_300Light,
		Jost_500Medium,
		Jost_700Bold
	});

	return fontsLoaded ? (
		<NativeBaseProvider config={config} theme={theme}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Login">
					<Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
					<Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
					<Stack.Screen options={{ headerShown: false }} name="AccountType" component={AccountType} />
					<Stack.Screen options={{ headerShown: false }} name="Verification" component={Verification} />
					{/* <Login /> */}
				</Stack.Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	) : (
		<AppLoading />
	);
}
