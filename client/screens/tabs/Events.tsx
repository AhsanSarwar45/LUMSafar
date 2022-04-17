import React, { useContext, useEffect, useState } from 'react';
import { AspectRatio, Box, FlatList, HStack, Icon, Input, Text, View, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

import TopBar from '../../components/TopBar';
import Screen from '../../components/Screen';
import TabsProps from '../../interfaces/TabsProps';
import { RootStackParamList } from '../../config/RouteParams';
import EventCard, { EventSkeletonCard } from '../../components/EventCard';
import { EventData } from '../../interfaces/EventData';
import { LUMSAFAR_SERVER_URL } from '@env';
import { JsonHeader } from '../../config/ControlHeader';
import { UserDataContext } from '../../data/UserDataContext';
import StatusBar from '../../components/StatusBar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const EventsTab = (props: TabsProps) => {
	const { userData, setUserData } = useContext(UserDataContext);
	const [ isFetching, setIsFetching ] = useState(false);
	const [ areEventsFinished, setAreEventsFinished ] = useState(false);
	const [ events, setEvents ] = useState<Array<EventData>>([]);
	const [ isSearching, setIsSearching ] = useState(false);

	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	useEffect(
		() => {
			if (isFetching) {
				Refresh();
			}
		},
		[ isFetching ]
	);

	useEffect(
		() => {
			if (events.length === 0) {
				FetchRecommendations(() => setIsFetching(false));
				// console.log('refreshing');
			}
		},
		[ events ]
	);

	const Refresh = () => {
		setAreEventsFinished(false);
		setEvents([]);
	};

	function FetchRecommendations(callback: Function) {
		const currentEvents = events.map((value: EventData, index: number) => value._id);
		// console.log(currentEvents);
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/events/fetch-recommendations`,
			{ userId: userData._id, currentEvents: currentEvents },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				if (response.data.length === 0) {
					setAreEventsFinished(true);
				} else {
					setEvents((old) => [ ...old, ...response.data ]);
				}
				callback();

				// setIsFetching(false);
			})
			.catch((response) => {
				console.log(response);
			});
	}

	const ModifyEvent = (index: number, data: EventData) => {
		let newArr = [ ...events ]; // copying the old datas array
		newArr[index] = data; // replace e.target.value with whatever you want to change it to
		setEvents(newArr);
	};

	// useEffect(
	// 	() => {
	// 		console.log(searchTerm);
	// 	},
	// 	[ searchTerm ]
	// );

	return (
		<View marginTop="5%">
			<StatusBar />

			<TopBar onSearchPress={() => navigation.navigate('EventsSearch')} search label={'Events'} />

			{/* <Screen lightScreen stacked={false} scrollType="none" topBar={<TopBar search label={'Events'} />}> */}
			<View px="8%" pb="20%" width="full">
				<FlatList
					showsVerticalScrollIndicator={false}
					data={events}
					refreshing={isFetching}
					onRefresh={() => setIsFetching(true)}
					ListFooterComponent={
						areEventsFinished ? (
							<VStack pt="40px" width="100%" alignItems={'center'} height="500px">
								<Text fontSize="xl" key={0}>
									You have reached the end 😲
								</Text>
							</VStack>
						) : (
							<VStack space={0.5} height="500px">
								{[ ...Array(3) ].map((value: any, index: number) => <EventSkeletonCard key={index} />)}
							</VStack>
						)
					}
					renderItem={({ item, index }) => (
						<EventCard setEvents={ModifyEvent} data={item as EventData} index={index} key={index} />
					)}
					keyExtractor={(item: EventData) => item._id}
					onEndReached={() => {
						if (!areEventsFinished) FetchRecommendations(() => {});
					}}
					onEndReachedThreshold={0.5}
				/>
			</View>
			{/* {events.map((item, index) => <EventCard data={item as EventData} index={index} key={index} />)} */}
			<Box height="120px" />
			{/* </Screen> */}
		</View>
	);
};
