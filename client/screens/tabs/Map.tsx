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

const MapTab = (props: TabsProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<View>
			<AppLoading />
			<OptimizedHeavyScreen>
				<Screen topBar={<TopBar />}>
					<MapView
						style={{
							width: '100%',
							height: '100%'
						}}
					/>
				</Screen>
			</OptimizedHeavyScreen>
		</View>
	);
};

export default MapTab;
