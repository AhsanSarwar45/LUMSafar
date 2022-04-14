import MapView from 'react-native-maps';

import React from 'react';
import { AspectRatio, Box, Container, Heading, useTheme, Text, VStack, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import TopBar from '../../components/TopBar';
import Screen from '../../components/Screen';
import TabsProps from '../../interfaces/TabsProps';
import { RootStackParamList } from '../../config/RouteParams';
import AppLoading from 'expo-app-loading';
import { useWindowDimensions } from 'react-native';

const MapTab = (props: TabsProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const window = useWindowDimensions();
	return (
		<Screen topBar={<TopBar transparent />}>
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
			/>
		</Screen>
	);
};

export default MapTab;
