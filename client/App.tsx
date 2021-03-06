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
import Menu from './screens/Menu';
import CreateEventScreen from './screens/CreateEvent';
import SplashScreen from './screens/Splash';
import CreateEventTagsScreen from './screens/CreateEventTags';
import CreateEventTimeScreen from './screens/CreateEventTime';
import CreateEventPreviewScreen from './screens/CreateEventPreview';
import { UserData } from './interfaces/UserData';
import { UserDataContext } from './data/UserDataContext';
import ProfileScreen from './screens/Profile';
import EventDetailsScreen from './screens/EventDetails';
import EventsSearchScreen from './screens/EventSearch';
import EditProfileScreen from './screens/EditProfile';
import UsersSearchScreen from './screens/UsersSearch';
import FriendRequestsScreen from './screens/FriendRequests';
import EditProfileTagsScreen from './screens/EditProfileTags';

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
	const [ userData, setUserData ] = useState({} as UserData);
	// const [ initialRouteName, setInitialRouteName ] = useState('');

	let [ fontsLoaded ] = useFonts({
		Jost_300Light,

		Jost_500Medium,
		Jost_700Bold
	});

	const navigationTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: 'rgba(255,255,255,1)'
		}
	};

	return fontsLoaded ? (
		<UserDataContext.Provider value={{ userData, setUserData }}>
			<NativeBaseProvider config={config} theme={theme}>
				<NavigationContainer theme={navigationTheme}>
					<Stack.Navigator initialRouteName={'Splash'}>
						<Stack.Screen options={{ headerShown: false }} name="Splash" component={SplashScreen} />
						<Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
						<Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
						<Stack.Screen
							options={{ headerShown: false }}
							name="EditProfile"
							component={EditProfileScreen}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="EditProfileTags"
							component={EditProfileTagsScreen}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="CreateEvent"
							component={CreateEventScreen}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="CreateEventTags"
							component={CreateEventTagsScreen}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="CreateEventTime"
							component={CreateEventTimeScreen}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="CreateEventPreview"
							component={CreateEventPreviewScreen}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="EventDetails"
							component={EventDetailsScreen}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="EventsSearch"
							component={EventsSearchScreen}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="UsersSearch"
							component={UsersSearchScreen}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="FriendRequests"
							component={FriendRequestsScreen}
						/>
						{/* <Stack.Screen options={{ headerShown: false }} name="ChipsSearch" component={ChipsSearchScreen} /> */}
						<Stack.Screen options={{ headerShown: false }} name="Menu" component={Menu} />
						<Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
						<Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
						<Stack.Screen options={{ headerShown: false }} name="SignUpInfo" component={SignUpInfoScreen} />
						<Stack.Screen
							options={{ headerShown: false }}
							name="AccountType"
							component={AccountTypeScreen}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="Verification"
							component={VerificationScreen}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="ForgotPassword"
							component={ForgotPasswordScreen}
						/>
						<Stack.Screen
							options={{ headerShown: false }}
							name="SetPassword"
							component={SetPasswordScreen}
						/>
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
		</UserDataContext.Provider>
	) : (
		<AppLoading />
	);
}
