import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Heading, HStack, useTheme } from 'native-base';
import React, { useContext } from 'react';
import Screen from '../components/Screen';
import { RootStackParamList } from '../config/RouteParams';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OptionCard from '../components/Option';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { UserDataContext } from '../data/UserDataContext';
import MenuCard from '../components/MenuCard';
import ScreenHeader from '../components/ScreenHeader';

type MenuScreenProps = NativeStackScreenProps<RootStackParamList, 'Menu'>;

const MenuScreen = (props: MenuScreenProps) => {
	const { colors } = useTheme();
	const { userData, setUserData } = useContext(UserDataContext);
	return (
		<Screen header={<ScreenHeader backButton text="Menu" />}>
			<MenuCard
				iconColor={colors.cards[0]}
				label="Profile"
				icon={<MaterialIcons name="person" />}
				onPress={() => {
					props.navigation.navigate('Profile', { data: userData });
				}}
			/>

			<MenuCard
				iconColor={colors.cards[1]}
				label="Friends"
				icon={<MaterialIcons name="group" />}
				onPress={() => {
					props.navigation.navigate('UsersSearch', { type: 'friends' });
				}}
			/>
			<MenuCard
				iconColor={colors.cards[2]}
				label="Following"
				icon={<MaterialCommunityIcons name="cards-heart" />}
				onPress={() => {
					props.navigation.navigate('UsersSearch', { type: 'following' });
				}}
			/>
			<MenuCard
				iconColor={colors.cards[3]}
				label="Search Users"
				icon={<MaterialIcons name="groups" />}
				onPress={() => {
					props.navigation.navigate('UsersSearch', { type: 'users' });
				}}
			/>
			<MenuCard
				iconColor={colors.cards[4]}
				label="Friend Requests"
				icon={<MaterialCommunityIcons name="handshake" />}
				onPress={() => {
					props.navigation.navigate('FriendRequests');
				}}
			/>
			{/* <MenuCard
				iconColor={colors.cards[0]}
				label="Settings"
				icon={<MaterialIcons name="settings" />}
				onPress={() => {
					props.navigation.navigate('Profile', { data: userData });
				}}
			/> */}
			{/* <MenuCard
				iconColor={colors.cards[1]}
				label="About"
				icon={<MaterialIcons name="info" />}
				onPress={() => {
					props.navigation.navigate('Profile', { data: userData });
				}}
			/> */}
			<MenuCard
				iconColor={colors.cards[2]}
				label="Log Out"
				icon={<Ionicons name="arrow-undo" />}
				onPress={() => {
					AsyncStorage.clear();
					props.navigation.reset({
						index: 0,
						routes: [ { name: 'Login' } ]
					});
				}}
			/>
		</Screen>
	);
};

export default MenuScreen;
