import React from 'react';
import { Box } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import TopBar from '../../components/TopBar';
import Screen from '../../components/Screen';
import TabsProps from '../../interfaces/TabsProps';
import { RootStackParamList } from '../../config/RouteParams';
import EventCard from '../../components/EventCard';

export const EventsTab = (props: TabsProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const events = [
		{
			name: 'Badminton Fest',
			creator: 'Abdullah',
			interested: false,
			image: ''
		},
		{
			name: 'Codinguru',
			creator: 'IEEE',
			interested: true,
			image: ''
		},
		{
			name: 'Arson',
			creator: 'Me and the boiz',
			interested: false,
			image: ''
		},
		{
			name: 'UX Pakistan',
			creator: 'INDEXS',
			interested: false,
			image: ''
		},
		{
			name: 'Geek Study Session',
			creator: 'Omer Kamran',
			interested: false,
			image: ''
		}
	];

	return (
		<Screen heading="Events" topBar={<TopBar search />}>
			{events.map((item, index) => <EventCard data={item} index={index} key={index} />)}
			<Box height="120px" />
		</Screen>
	);
};
