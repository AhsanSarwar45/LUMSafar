import MapView, { Marker } from 'react-native-maps';

import React, { useEffect, useState } from 'react';
import { AspectRatio, Box, Container, Heading, useTheme, Text, VStack, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';
import * as Location from 'expo-location';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import TopBar from '../../components/TopBar';
import Screen from '../../components/Screen';
import TabsProps from '../../interfaces/TabsProps';
import { RootStackParamList } from '../../config/RouteParams';
import AppLoading from 'expo-app-loading';
import { useWindowDimensions } from 'react-native';

const MapTab = (props: TabsProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const [ myLocation, setMyLocation ] = useState<Location.LocationObject>();
	const [ permissionGranted, setPermissionGranted ] = useState(false);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status === 'granted') {
				setPermissionGranted(true);
			}

			let location = await Location.getCurrentPositionAsync({});
			setMyLocation(location);
			console.log(location);
		})();
	}, []);

	const window = useWindowDimensions();
	return (
		<Screen topBar={<TopBar overlay type="icons" />}>
			<MapView
				initialRegion={{
					latitude: 31.47058452968967,
					longitude: 74.40957425948184,
					latitudeDelta: 0.005,
					longitudeDelta: 0.005
				}}
				style={{
					width: window.width,
					height: window.height
				}}
			>
				{myLocation ? (
					<Marker
						coordinate={{
							latitude: (myLocation as Location.LocationObject).coords.latitude,
							longitude: (myLocation as Location.LocationObject).coords.longitude
						}}
						title={'Me'}
					/>
				) : null}
			</MapView>
		</Screen>
	);
};

export default MapTab;
