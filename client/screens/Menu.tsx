import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, HStack, Text, useTheme, VStack } from 'native-base';
import React from 'react';
import Screen from '../components/Screen';
import { RootStackParamList } from '../config/RouteParams';
import { Pressable, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';
import AppLoading from 'expo-app-loading';
import OptionCard from '../components/Option';
import { Ionicons } from '@expo/vector-icons';

type MenuScreenProps = NativeStackScreenProps<RootStackParamList, 'Menu'>;

const MenuScreen = ({ route, navigation }: MenuScreenProps) => {
	return (
		<View>
			<AppLoading />
			<OptimizedHeavyScreen>
				<Screen backButton>
					<HStack space="5%">
						<OptionCard
							label="Logout"
							width="47.5%"
							height="auto"
							py="5%"
							icon={<Ionicons name="arrow-undo-outline" />}
							onPress={() => {
								AsyncStorage.clear();
								navigation.reset({
									index: 0,
									routes: [ { name: 'Login' } ]
								});
							}}
						/>
						<OptionCard
							label="Logout"
							width="47.5%"
							height="auto"
							py="5%"
							icon={<Ionicons name="arrow-undo-outline" />}
							onPress={() => {
								AsyncStorage.clear();
								navigation.navigate('Login');
							}}
						/>
					</HStack>
				</Screen>
			</OptimizedHeavyScreen>
		</View>
	);
};

export default MenuScreen;
