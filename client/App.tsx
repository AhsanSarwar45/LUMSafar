import React, { useEffect, useState } from 'react';
import { NativeBaseProvider } from 'native-base';
import { AccountTypeScreen } from './screens/AccountType';
import { SignUpScreen } from './screens/SignUp';
import { SignUpInfoScreen } from './screens/SignUpInfo';
import { ForgotPasswordScreen } from './screens/ForgotPassword';
import { SetPasswordScreen } from './screens/SetPassword';
import { PasswordResetSuccessScreen } from './screens/PasswordResetSuccess';
import { VerificationScreen } from './screens/Verification';
import { LoginScreen } from './screens/Login';
import { Home } from './screens/Home';
import { theme, config } from './themes/Theme';
import { useFonts, Jost_300Light, Jost_500Medium, Jost_700Bold } from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from './screens/Menu';
import CreateEventScreen from './screens/CreateEvents';

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
	const [ initialRouteName, setInitialRouteName ] = useState('');

	let [ fontsLoaded ] = useFonts({
		Jost_300Light,

		Jost_500Medium,
		Jost_700Bold
	});

	async function CheckLogin() {
		try {
			const userData = await AsyncStorage.getItem('userData');
			const data = JSON.parse(userData as string);

			setInitialRouteName(data == null ? 'Login' : 'Home');
		} catch (error) {
			console.log('Something went wrong getting storage data', error);
		}
	}

	useEffect(() => {
		CheckLogin();
	}, []);

	const navigationTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: 'rgba(255,255,255,0)'
		}
	};

	return fontsLoaded ? (
		<NativeBaseProvider config={config} theme={theme}>
			<NavigationContainer theme={navigationTheme}>
				<Stack.Navigator initialRouteName={initialRouteName}>
					<Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
					<Stack.Screen options={{ headerShown: false }} name="CreateEvent" component={CreateEventScreen} />
					{/* <Stack.Screen options={{ headerShown: false }} name="ChipsSearch" component={ChipsSearchScreen} /> */}
					<Stack.Screen options={{ headerShown: false }} name="Menu" component={Menu} />
					<Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
					<Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
					<Stack.Screen options={{ headerShown: false }} name="SignUpInfo" component={SignUpInfoScreen} />
					<Stack.Screen options={{ headerShown: false }} name="AccountType" component={AccountTypeScreen} />
					<Stack.Screen options={{ headerShown: false }} name="Verification" component={VerificationScreen} />
					<Stack.Screen
						options={{ headerShown: false }}
						name="ForgotPassword"
						component={ForgotPasswordScreen}
					/>
					<Stack.Screen options={{ headerShown: false }} name="SetPassword" component={SetPasswordScreen} />
					<Stack.Screen
						options={{ headerShown: false }}
						name="PasswordResetSuccess"
						component={PasswordResetSuccessScreen}
					/>
					{/* {test} */}
					{/* <Login /> */}
				</Stack.Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	) : (
		<AppLoading />
	);
}
