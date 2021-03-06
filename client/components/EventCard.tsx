import { AspectRatio, useTheme, VStack, Text, HStack, Image, Skeleton, Button, Icon } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { EventData } from '../interfaces/EventData';
import HeartIcon from '../assets/icons/HeartIcon.svg';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../config/RouteParams';
import { LUMSAFAR_SERVER_URL } from '@env';
import { JsonHeader } from '../config/ControlHeader';
import { UserDataContext } from '../data/UserDataContext';
import moment from 'moment';

interface EventCardProps {
	index: number;
	data: EventData;
	setEvents: Function;
	disableInterests: boolean;
}

const EventCard = (props: EventCardProps) => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { userData, setUserData } = useContext(UserDataContext);
	const [ interested, setInterested ] = useState(props.data.interestedUsers.includes(userData._id));

	const { colors } = useTheme();

	const colorIndex: number = props.index % Object.keys(colors.cards).length;
	const isTitleLong = props.data.title.length > 14;

	function ToggleInterest() {
		if (props.disableInterests) return;

		let modifiedData = props.data;
		if (modifiedData.interestedUsers.includes(userData._id)) {
			setInterested(false);
			const index = modifiedData.interestedUsers.indexOf(userData._id);
			if (index > -1) {
				modifiedData.interestedUsers.splice(index, 1); // 2nd parameter means remove one item only
			}
		} else {
			setInterested(true);
			modifiedData.interestedUsers.push(userData._id);
		}
		props.setEvents(props.index, modifiedData);
		Axios.post(
			`${LUMSAFAR_SERVER_URL}/events/toggle-interest`,
			{ eventId: props.data._id, userId: userData._id },
			{
				headers: JsonHeader
			}
		)
			.then((response) => {
				if (response.data === 'success') {
					console.log('marked as interested');
				} else {
					console.log('failure');
				}
			})
			.catch((response) => {
				console.log(response);
			});
	}

	return (
		<AspectRatio
			marginBottom={4}
			width="full"
			ratio={{
				base: 16 / 9,
				md: 16 / 9
			}}
		>
			<Button
				p={0}
				m={0}
				shadow={0}
				width="full"
				height="full"
				variant="unstyled"
				onPress={() => navigation.navigate('EventDetails', { data: props.data })}
			>
				<HStack
					height="full"
					justifyContent="space-between"
					rounded={'3xl'}
					bgColor={colors.cards[colorIndex]}
					shadow={5}
				>
					<VStack
						width={props.data.imagePath ? '60%' : '100%'}
						px="9%"
						pt="8%"
						pb="6%"
						justifyContent="space-between"
					>
						<VStack width="100%">
							<Text
								width="100%"
								fontSize={
									props.data.imagePath && isTitleLong ? (
										'xl'
									) : props.data.imagePath || isTitleLong ? (
										'2xl'
									) : (
										'3xl'
									)
								}
								lineHeight="sm"
								color="white"
							>
								{props.data.title}
							</Text>
							<Text width="100%" color="rgba(255,255,255,0.75)">
								{props.data.creatorUsername}
							</Text>
						</VStack>
						<HStack justifyContent="space-between" alignItems="flex-end">
							<Icon
								as={<Ionicons name={interested ? 'ios-heart' : 'ios-heart-outline'} />}
								size={8}
								onPress={ToggleInterest}
								color="white"
							/>
							<VStack alignItems="flex-end">
								<Text color="rgba(255,255,255,0.75)" fontSize="xs" mb={-1}>
									{moment.unix(props.data.startTime).format('hh:mm A')}
								</Text>
								<Text color="white" fontSize="md">
									{moment.unix(props.data.startTime).format('D MMM')}
								</Text>
							</VStack>
						</HStack>
					</VStack>
					{props.data.imagePath ? (
						<Image
							roundedLeft="none"
							width="40%"
							height="full"
							source={{
								uri: props.data.imagePath
							}}
							alt="Event Card Image"
						/>
					) : null}
				</HStack>
			</Button>
		</AspectRatio>
	);
};

export const EventSkeletonCard = () => {
	return (
		<AspectRatio
			marginBottom={4}
			width="full"
			ratio={{
				base: 16 / 9,
				md: 16 / 9
			}}
		>
			<HStack justifyContent="space-between" rounded={'3xl'} bgColor={'gray.400'} shadow={5}>
				<VStack width="60%" px="9%" pt="8%" pb="6%" justifyContent="space-between">
					<VStack width="100%">
						<Skeleton.Text key={1} />
					</VStack>

					<Skeleton width={5} height={5} rounded="2xl" startColor="gray.100" key={2} />
				</VStack>
				<Skeleton
					width="40%"
					roundedLeft="none"
					roundedRight="2xl"
					startColor="gray.100"
					height="full"
					key={2}
				/>
			</HStack>
		</AspectRatio>
	);
};

EventCard.defaultProps = {
	setEvents: () => {},
	disableInterests: false
};

export default EventCard;
