import React from 'react';
import { Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import TopBar from '../../components/TopBar';
import Screen from '../../components/Screen';
import TabsProps from '../../interfaces/TabsProps';
import { RootStackParamList } from '../../config/RouteParams';
import EventCard from '../../components/EventCard';
import { EventData } from '../../interfaces/EventsData';

export const EventsTab = (props: TabsProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const events = [
		{
			title: 'Badminton Fest',
			creatorUsername: 'Abdullah',
			imagePath: ''
		},
		{
			title: 'Codinguru',
			creatorUsername: 'IEEE',
			imagePath: ''
		},
		{
			title: 'Arson',
			creatorUsername: 'Me and the boiz',
			imagePath: ''
		},
		{
			title: 'UX Pakistan',
			creatorUsername: 'INDEX',
			imagePath: ''
		},
		{
			title: 'Geek Study Session',
			creatorUsername: 'Omer Kamran',
			imagePath: ''
		}
	];

	return (
		<Screen heading="Events" topBar={<TopBar search />}>
			{events.map((item, index) => <EventCard data={item as EventData} index={index} key={index} />)}
			<Box height="120px" />
		</Screen>
	);
};
