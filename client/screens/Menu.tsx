import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Heading, HStack } from 'native-base';
import React, { useContext } from 'react';
import Screen from '../components/Screen';
import { RootStackParamList } from '../config/RouteParams';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OptionCard from '../components/Option';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { UserDataContext } from '../data/UserDataContext';

type MenuScreenProps = NativeStackScreenProps<RootStackParamList, 'Menu'>;

const MenuScreen = (props: MenuScreenProps) => {
	const { userData, setUserData } = useContext(UserDataContext);
	return (
		<Screen backButton>
			<Heading>{userData.username} </Heading>
			<HStack space="5%" flexWrap="wrap">
				<OptionCard
					label="Profile"
					width="45%"
					height="auto"
					// mt={2}
					py="5%"
					icon={<MaterialIcons name="person" />}
					onPress={() => {
						props.navigation.navigate('Profile', { data: userData });
					}}
				/>
				<OptionCard
					label="Friends"
					width="45%"
					height="auto"
					py="5%"
					// mt={2}
					icon={<MaterialIcons name="group" />}
					onPress={() => {
						props.navigation.navigate('Profile', { data: userData });
					}}
				/>
				<OptionCard
					label="Following"
					width="45%"
					height="auto"
					py="5%"
					mt={4}
					icon={<MaterialCommunityIcons name="cards-heart" />}
					onPress={() => {
						props.navigation.navigate('Profile', { data: userData });
					}}
				/>
				<OptionCard
					label="Settings"
					width="45%"
					height="auto"
					py="5%"
					mt={4}
					icon={<MaterialIcons name="settings" />}
					onPress={() => {
						props.navigation.navigate('Profile', { data: userData });
					}}
				/>
				<OptionCard
					label="About"
					width="45%"
					height="auto"
					py="5%"
					mt={4}
					icon={<MaterialIcons name="info-outline" />}
					onPress={() => {
						props.navigation.navigate('Profile', { data: userData });
					}}
				/>

				<OptionCard
					label="Logout"
					width="45%"
					height="auto"
					py="5%"
					mt={4}
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
