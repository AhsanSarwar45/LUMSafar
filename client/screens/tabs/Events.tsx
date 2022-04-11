import TopBar from '../../components/TopBar';
import Screen from '../../components/Screen';
import React from 'react';
import { AspectRatio, Box, Container, Heading, useTheme, Text, VStack } from 'native-base';
import TabsProps from '../../interfaces/TabsProps';
import HeartIcon from '../../assets/icons/HeartIcon.svg';

export const EventsTab = (props: TabsProps) => {
	const { borderRadius, colors } = useTheme();

	interface EventCardProps {
		index: number;
		data: EventData;
	}

	interface EventData {
		name: string;
		creator: string;
		interested: boolean;
	}

	const events = [
		{
			name: 'Badminton Fest',
			creator: 'Abdullah',
			interested: false
		},
		{
			name: 'Codinguru',
			creator: 'IEEE',
			interested: true
		},
		{
			name: 'Arson',
			creator: 'Me and the boiz',
			interested: false
		}
	];

	const EventCard = (props: EventCardProps) => {
		const colorIndex: number = props.index % Object.keys(colors.cards).length;

		return (
			<AspectRatio
				width="full"
				ratio={{
					base: 16 / 9,
					md: 16 / 9
				}}
			>
				<VStack
					px="9%"
					py="6%"
					rounded={'3xl'}
					bgColor={colors.cards[colorIndex]}
					shadow={5}
					justifyContent="space-between"
				>
					<VStack>
						<Text fontSize="2xl" color="white">
							{props.data.name}
						</Text>
						<Text color="rgba(255,255,255,0.75)">{props.data.creator}</Text>
					</VStack>

					<HeartIcon fill="white" width={40} height={40} />
				</VStack>
			</AspectRatio>
		);
	};

	return (
		<Screen heading="Events" topBar={<TopBar search />}>
			{events.map((item, index) => <EventCard data={item} index={index} key={index} />)}
			<Box height="20px" />
		</Screen>
	);
};
