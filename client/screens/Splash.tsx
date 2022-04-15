import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'native-base';
import React, { useEffect } from 'react';
import { RootStackParamList } from '../config/RouteParams';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = (props: SplashScreenProps) => {
	async function CheckLogin() {
		try {
			const userData = await AsyncStorage.getItem('userData');
			const data = JSON.parse(userData as string);

			const routeName = data === null ? 'Login' : 'Home';

			props.navigation.reset({
				index: 0,
				routes: [ { name: routeName } ]
			});

			// setInitialRouteName(data == null ? 'Login' : 'Home');
		} catch (error) {
			console.log('Something went wrong getting storage data', error);
		}
	}

	useEffect(() => {
		CheckLogin();
	}, []);

	return <View />;
};

export default SplashScreen;
