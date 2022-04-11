import TopBar from '../../components/TopBar';
import Screen from '../../components/Screen';
import React from 'react';
import { AspectRatio, Box, Container, useTheme } from 'native-base';
import TabsProps from '../../interfaces/TabsProps';

export const EventsTab = (props: TabsProps) => {
	const { borderRadius } = useTheme();

	const EventCard = () => {
		return (
			<AspectRatio
				width="full"
				ratio={{
					base: 16 / 9,
					md: 16 / 9
				}}
			>
				<Box rounded={borderRadius} bgColor="primary.500" />
			</AspectRatio>
		);
	};

	return (
		<Screen heading="Events" topBar={<TopBar search />} paddingBottom={props.paddingBottom}>
			<EventCard />
			<EventCard />
			<EventCard />
			<Box height="20px" />
		</Screen>
	);
};
