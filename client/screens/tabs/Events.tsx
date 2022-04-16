import React, { useContext, useEffect, useState } from 'react';
import { AspectRatio, Box, FlatList, HStack, Skeleton, View, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import TopBar from '../../components/TopBar';
import Screen from '../../components/Screen';
import TabsProps from '../../interfaces/TabsProps';
import { RootStackParamList } from '../../config/RouteParams';
import EventCard, { EventSkeletonCard } from '../../components/EventCard';
import { EventData } from '../../interfaces/EventsData';
import { LUMSAFAR_SERVER_URL } from '@env';
import { JsonHeader } from '../../config/ControlHeader';
import { UserDataContext } from '../../data/UserDataContext';
import StatusBar from '../../components/StatusBar';

export const EventsTab = (props: TabsProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { userData, setUserData } = useContext(UserDataContext);
	const [ isFetching, setIsFetching ] = useState(false);

	const [ events, setEvents ] = useState<Array<EventData>>([]);

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
				console.log('refreshing');
			}
		},
		[ events ]
	);

	const Refresh = () => {
		setEvents([]);
	};

	function FetchRecommendations(callback: Function) {
		const currentEvents = events.map((value: EventData, index: number) => value._id);
		console.log(currentEvents);
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/events/fetch-recommendations`,
			{ userId: userData._id, currentEvents: currentEvents },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				setEvents((old) => [ ...old, ...response.data ]);
				callback();
				// setIsFetching(false);
			})
			.catch((response) => {
				console.log(response);
			});
	}

	return (
		<View marginTop="5%">
			<StatusBar />
			<TopBar search label={'Events'} />
			{/* <Screen lightScreen stacked={false} scrollType="none" topBar={<TopBar search label={'Events'} />}> */}
			<View px="8%" pb="20%" width="full">
				<FlatList
					showsVerticalScrollIndicator={false}
					data={events}
					refreshing={isFetching}
					onRefresh={() => setIsFetching(true)}
					ListFooterComponent={
						<VStack space={0.5}>
							{[ ...Array(3) ].map((value: any, index: number) => <EventSkeletonCard key={index} />)}
						</VStack>
					}
					renderItem={({ item, index }) => <EventCard data={item as EventData} index={index} key={index} />}
					keyExtractor={(item: EventData) => item._id}
					onEndReached={() => {
						FetchRecommendations(() => {});
						console.log('fetching new');
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
