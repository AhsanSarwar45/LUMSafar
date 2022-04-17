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
				label="Settings"
				icon={<MaterialIcons name="settings" />}
				onPress={() => {
					props.navigation.navigate('Profile', { data: userData });
				}}
			/>
			<MenuCard
				iconColor={colors.cards[0]}
				label="About"
				icon={<MaterialIcons name="info" />}
				onPress={() => {
					props.navigation.navigate('Profile', { data: userData });
				}}
			/>
			<MenuCard
				iconColor={colors.cards[1]}
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

			{/* <HStack space="5%" flexWrap="wrap">
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
			</HStack> */}
		</Screen>
	);
};

export default MenuScreen;
