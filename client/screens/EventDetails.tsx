import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from '../config/RouteParams';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import { Button, Heading, Text, VStack, HStack, useTheme, Spacer, Icon } from 'native-base';
import TimeCard from '../components/TimeCard';
import moment from 'moment';
import MapIcon from '../assets/icons/MapIcon.svg';
import PersonIcon from '../assets/icons/PersonIcon.svg';

import Chip from '../components/Chip';
import ScreenHeader from '../components/ScreenHeader';

type EventDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'EventDetails'>;

const EventDetailsScreen = (props: EventDetailsScreenProps) => {
	const { colors } = useTheme();
	const { data } = props.route.params;

	return (
		<Screen header={<ScreenHeader backButton />}>
			<VStack width="full">
				<Heading size="2xl" width="full">
					{data.title}
				</Heading>
				<Heading size="sm" width="full" color="text.secondary">
					{data.creatorUsername}
				</Heading>
			</VStack>
			<Text width="full">{data.description}</Text>
			<HStack space="5%">
				<TimeCard label="From" time={moment.unix(data.startTime)} />
				<TimeCard label="To" time={moment.unix(data.endTime)} />
			</HStack>

			<HStack
				bgColor="background"
				rounded="2xl"
				shadow={2}
				px={5}
				py={3}
				space={2}
				width="full"
				justifyContent="space-between"
				alignItems="center"
			>
				<VStack>
					<Text color="text.secondary">Location</Text>
					{/* <Spacer /> */}
					<Text>{data.location}</Text>
				</VStack>
				<Icon as={<Ionicons name="md-location" />} fontWeight={700} size={6} color="primary.500" />

				{/* <MapIcon fill={colors.primary[500]} width={32} height={32} /> */}
			</HStack>
			<HStack
				bgColor="background"
				rounded="2xl"
				shadow={2}
				px={5}
				py={3}
				width="full"
				justifyContent="space-between"
				alignItems="center"
			>
				<VStack space={2}>
					<Text color="text.secondary">Tags</Text>
					{/* <Spacer /> */}
					{data.tags.length === 0 ? (
						<Text color="text.primary">None</Text>
					) : (
						<HStack flexWrap="wrap" width="full">
							{data.tags.map((item: string, index: number) => (
								<Chip
									key={index}
									color={colors.cards[index % Object.keys(colors.cards).length]}
									label={item}
								/>
							))}
						</HStack>
					)}
				</VStack>
				<Icon as={<Ionicons name="ios-pricetag" />} size={6} color="primary.500" />
			</HStack>
			<HStack
				bgColor="background"
				rounded="2xl"
				shadow={2}
				px={5}
				py={3}
				space={2}
				width="full"
				justifyContent="space-between"
				alignItems="center"
			>
				<VStack>
					<Text color="text.secondary">Interested Users</Text>
					{/* <Spacer /> */}
					<Text>{data.interestedUsers.length}</Text>
				</VStack>
				{/* <Ionicons name="person-outline" size={24} color="black" /> */}
				<Icon as={<Ionicons name="person" />} size={6} color="primary.500" />

				{/* <PersonIcon fill={colors.primary[500]} width={32} height={32} /> */}
			</HStack>
		</Screen>
	);
};

export default EventDetailsScreen;
