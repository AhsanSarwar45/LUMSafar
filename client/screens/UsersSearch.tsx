import React, { useContext, useEffect, useState } from 'react';
import { AspectRatio, Box, FlatList, HStack, Icon, Input, Text, View, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

import TopBar from '../components/TopBar';
import Screen from '../components/Screen';
import TabsProps from '../interfaces/TabsProps';
import { RootStackParamList } from '../config/RouteParams';
import UserCard, { UserSkeletonCard } from '../components/UserCard';
import { UserData } from '../interfaces/UserData';
import { LUMSAFAR_SERVER_URL } from '@env';
import { JsonHeader } from '../config/ControlHeader';
import { UserDataContext } from '../data/UserDataContext';
import StatusBar from '../components/StatusBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SearchBar from '../components/SearchBar';

type UsersSearchScreenProps = NativeStackScreenProps<RootStackParamList, 'UsersSearch'>;

const UsersSearchScreen = (props: UsersSearchScreenProps) => {
	const { userData, setUserData } = useContext(UserDataContext);
	const [ isFetching, setIsFetching ] = useState(false);
	const [ Users, setUsers ] = useState<Array<UserData>>([]);

	function FetchSearchResults(searchTerm: string) {
		setIsFetching(true);
		// console.log(currentUsers);
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/users/search`,
			{ query: searchTerm, searchType: 'users', userId: userData._id },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				setUsers(response.data);
			})
			.catch((response) => {
				console.log(response);
			})
			.finally(() => setIsFetching(true));
	}

	const ModifyUser = (index: number, data: UserData) => {
		let newArr = [ ...Users ]; // copying the old datas array
		newArr[index] = data; // replace e.target.value with whatever you want to change it to
		setUsers(newArr);
	};

	return (
		<View marginTop="5%">
			<StatusBar />

			<SearchBar onSubmit={(searchTerm: string) => FetchSearchResults(searchTerm)} />

			{/* <Screen lightScreen stacked={false} scrollType="none" topBar={<TopBar search label={'Users'} />}> */}
			<View px="8%" pb="20%" width="full">
				<FlatList
					showsVerticalScrollIndicator={false}
					data={Users}
					ListFooterComponent={
						isFetching ? (
							<VStack space={0.5} height="500px">
								{[ ...Array(5) ].map((value: any, index: number) => <UserSkeletonCard key={index} />)}
							</VStack>
						) : (
							<Box height="500px" />
						)
					}
					renderItem={({ item, index }) => <UserCard data={item as UserData} index={index} key={index} />}
					keyExtractor={(item: UserData) => item._id}
				/>
			</View>
			<Box height="120px" />
			{/* </Screen> */}
		</View>
	);
};

export default UsersSearchScreen;
