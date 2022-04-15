import { AspectRatio, useTheme, VStack, Text, HStack, Image } from 'native-base';
import React, { useEffect } from 'react';
import { EventData } from '../interfaces/EventsData';
import HeartIcon from '../assets/icons/HeartIcon.svg';

interface EventCardProps {
	index: number;
	data: EventData;
}

const EventCard = (props: EventCardProps) => {
	const { colors } = useTheme();

	const colorIndex: number = props.index % Object.keys(colors.cards).length;
	const isTitleLong = props.data.title.length > 14;
	// const fontSize =

	// useEffect(() => {
	// 	// console.log('Card image', props.data.image);
	// }, []);

	return (
		<AspectRatio
			width="full"
			ratio={{
				base: 16 / 9,
				md: 16 / 9
			}}
		>
			<HStack justifyContent="space-between" rounded={'3xl'} bgColor={colors.cards[colorIndex]} shadow={5}>
				<VStack
					width={props.data.image ? '60%' : '100%'}
					px="9%"
					pt="8%"
					pb="6%"
					justifyContent="space-between"
				>
					<VStack width="100%">
						<Text
							width="100%"
							fontSize={
								props.data.image && isTitleLong ? 'xl' : props.data.image || isTitleLong ? '2xl' : '3xl'
							}
							lineHeight="xs"
							color="white"
						>
							{props.data.title}
						</Text>
						<Text width="100%" color="rgba(255,255,255,0.75)">
							{props.data.creator}
						</Text>
					</VStack>

					<HeartIcon fill="white" width={32} height={32} />
				</VStack>
				{props.data.image ? (
					<Image
						roundedLeft="none"
						width="40%"
						height="full"
						source={{
							uri: props.data.image
						}}
						alt="Event Card Image"
					/>
				) : null}
			</HStack>
		</AspectRatio>
	);
};

export default EventCard;
