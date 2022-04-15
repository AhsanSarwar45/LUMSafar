import React, { useContext, useEffect, useState } from 'react';
import { Box, FlatList, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import TopBar from '../../components/TopBar';
import Screen from '../../components/Screen';
import TabsProps from '../../interfaces/TabsProps';
import { RootStackParamList } from '../../config/RouteParams';
import EventCard from '../../components/EventCard';
import { EventData } from '../../interfaces/EventsData';
import { LUMSAFAR_SERVER_URL } from '@env';
import { JsonHeader } from '../../config/ControlHeader';
import { UserDataContext } from '../../data/UserDataContext';

export const EventsTab = (props: TabsProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { userData, setUserData } = useContext(UserDataContext);
	const [ isFetching, setIsFetching ] = useState(false);

	const [ events, setEvents ] = useState<Array<EventData>>([
		{
			_id: '1',
			creatorId: '',
			description: '',
			location: '',
			title: 'Badminton Fest',
			creatorUsername: 'Abdullah',
			imagePath: '',
			tags: [],
			startTime: 0,
			endTime: 0,
			interestedUsers: []
		},
		{
			_id: '2',
			creatorId: '',
			description: '',
			location: '',
			title: 'Codinguru',
			creatorUsername: 'IEEE',
			imagePath: '',
			tags: [],
			startTime: 0,
			endTime: 0,
			interestedUsers: []
		},
		{
			_id: '3',
			creatorId: '',
			description: '',
			location: '',
			title: 'UX Pakistan',
			creatorUsername: 'INDEX',
			imagePath: '',
			tags: [],
			startTime: 0,
			endTime: 0,
			interestedUsers: []
		},
		{
			_id: '4',
			creatorId: '',
			description: '',
			location: '',
			title: 'UX Pakistan',
			creatorUsername: 'INDEX',
			imagePath: '',
			tags: [],
			startTime: 0,
			endTime: 0,
			interestedUsers: []
		},
		{
			_id: '5',
			creatorId: '',
			description: '',
			location: '',
			title: 'Badminton Fest',
			creatorUsername: 'Abdullah',
			imagePath: '',
			tags: [],
			startTime: 0,
			endTime: 0,
			interestedUsers: []
		},
		{
			_id: '6',
			creatorId: '',
			description: '',
			location: '',
			title: 'Codinguru',
			creatorUsername: 'IEEE',
			imagePath: '',
			tags: [],
			startTime: 0,
			endTime: 0,
			interestedUsers: []
		},
		{
			_id: '7',
			creatorId: '',
			description: '',
			location: '',
			title: 'UX Pakistan',
			creatorUsername: 'INDEX',
			imagePath: '',
			tags: [],
			startTime: 0,
			endTime: 0,
			interestedUsers: []
		},
		{
			_id: '8',
			creatorId: '',
			description: '',
			location: '',
			title: 'UX Pakistan',
			creatorUsername: 'INDEX',
			imagePath: '',
			tags: [],
			startTime: 0,
			endTime: 0,
			interestedUsers: []
		}
	]);

	useEffect(
		() => {
			if (isFetching) {
				Refresh();
			}
		},
		[ isFetching ]
	);

	const Refresh = () => {
		setEvents([]);
		FetchRecommendations();
	};

	function FetchRecommendations() {
		console.log('fetch');
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/events/fetch-recommendations`,
			{ currenList: events, userId: userData._id },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				setEvents((old) => [ ...old, ...response.data ]);
				setIsFetching(false);
			})
			.catch((response) => {
				console.log(response);
			});
	}

	return (
		<Screen lightScreen stacked={false} scrollType="none" topBar={<TopBar search label={'Events'} />}>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={events}
				refreshing={isFetching}
				onRefresh={() => setIsFetching(true)}
				ListFooterComponent={<Box height="300px" />}
				renderItem={({ item, index }) => <EventCard data={item as EventData} index={index} key={index} />}
				keyExtractor={(item: EventData) => item._id}
				onEndReached={FetchRecommendations}
				onEndReachedThreshold={0}
			/>
			{/* {events.map((item, index) => <EventCard data={item as EventData} index={index} key={index} />)} */}
			<Box height="120px" />
		</Screen>
	);
};
