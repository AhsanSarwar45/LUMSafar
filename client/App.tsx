import React, { useEffect } from 'react';
import { NativeBaseProvider } from 'native-base';
import { AccountTypeScreen } from './screens/AccountType';
import { SignUpScreen } from './screens/SignUp';
import { SignUpInfoScreen } from './screens/SignUpInfo';
import { ForgotPasswordScreen } from './screens/ForgotPassword';
import { SetPasswordScreen } from './screens/SetPassword';
import { PasswordResetSuccessScreen } from './screens/PasswordResetSuccess';
import { VerificationScreen } from './screens/Verification';
import { LoginScreen } from './screens/Login';
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
					{/* <Login /> */}
				</Stack.Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	) : (
		<AppLoading />
	);
}
