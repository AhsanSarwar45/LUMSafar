import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Heading, HStack } from 'native-base';
import React, { useContext } from 'react';
import Screen from '../components/Screen';
import { RootStackParamList } from '../config/RouteParams';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OptionCard from '../components/Option';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { UserDataContext } from '../data/UserDataContext';

type MenuScreenProps = NativeStackScreenProps<RootStackParamList, 'Menu'>;

const MenuScreen = (props: MenuScreenProps) => {
	const { userData, setUserData } = useContext(UserDataContext);
	return (
		<Screen backButton>
			<Heading>{userData.username} </Heading>
			<HStack space="5%">
				<OptionCard
					label="Profile"
					width="47.5%"
					height="auto"
					py="5%"
					icon={<MaterialIcons name="person" />}
					onPress={() => {
						props.navigation.navigate('Profile', { data: userData });
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
						props.navigation.reset({
							index: 0,
							routes: [ { name: 'Login' } ]
						});
					}}
				/>
			</HStack>
		</Screen>
	);
};

export default MenuScreen;
