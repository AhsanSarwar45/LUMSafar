import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HStack } from 'native-base';
import React from 'react';
import Screen from '../components/Screen';
import { RootStackParamList } from '../config/RouteParams';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OptionCard from '../components/Option';
import { Ionicons } from '@expo/vector-icons';

type MenuScreenProps = NativeStackScreenProps<RootStackParamList, 'Menu'>;

const MenuScreen = ({ route, navigation }: MenuScreenProps) => {
	return (
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
	);
};

export default MenuScreen;
