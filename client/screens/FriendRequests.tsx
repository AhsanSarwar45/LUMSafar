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
import ScreenHeader from '../components/ScreenHeader';

type FriendRequestsScreenProps = NativeStackScreenProps<RootStackParamList, 'FriendRequests'>;

const FriendRequestsScreen = (props: FriendRequestsScreenProps) => {
	const { userData, setUserData } = useContext(UserDataContext);
	const [ isFetching, setIsFetching ] = useState(false);
	const [ friendRequests, setFriendRequests ] = useState<Array<UserData>>([]);
	const [ hasSent, SetSent ] = useState(false);

	function FetchFriendRequests() {
		setIsFetching(true);
		// console.log(currentUsers);
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/users/show-friend-requests`,
			{ userId: userData._id },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				setFriendRequests(response.data);
				SetSent(true);
			})
			.catch((response) => {
				console.log(response);
			})
			.finally(() => setIsFetching(false));
	}

	useEffect(() => {
		// setIsEmpty(false);
		FetchFriendRequests();
	}, []);

	// useEffect(
	// 	() => {
	// 		if (friendRequests.length === 0) {
	// 			setIsEmpty(true);
	// 		}
	// 	},
	// 	[ friendRequests ]
	// );

	return (
		<View marginTop="8%">
			<StatusBar />

			{/* <Screen lightScreen stacked={false} scrollType="none" topBar={<TopBar search label={'Users'} />}> */}
			<View px="8%" pb="20%" width="full">
				<FlatList
					ListHeaderComponent={<ScreenHeader text="Friend Requests" backButton />}
					stickyHeaderIndices={[ 0 ]}
					showsVerticalScrollIndicator={false}
					data={friendRequests}
					ListFooterComponent={
						isFetching || !hasSent ? (
							<VStack space={0.5} height="500px">
								{[ ...Array(5) ].map((value: any, index: number) => <UserSkeletonCard key={index} />)}
							</VStack>
						) : (
							<VStack pt="40px" width="100%" alignItems={'center'} height="500px">
								<Text fontSize="xl" key={0}>
									Nothing... 🙂
								</Text>
							</VStack>
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

export default FriendRequestsScreen;
