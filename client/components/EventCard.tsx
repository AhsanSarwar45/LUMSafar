import { AspectRatio, useTheme, VStack, Text, HStack, Image, Skeleton } from 'native-base';
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
	// 	// console.log('Card imagePath', props.data.imagePath);
	// }, []);

	return (
		<AspectRatio
			marginBottom={4}
			width="full"
			ratio={{
				base: 16 / 9,
				md: 16 / 9
			}}
		>
			<HStack justifyContent="space-between" rounded={'3xl'} bgColor={colors.cards[colorIndex]} shadow={5}>
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

					<HeartIcon fill="white" width={32} height={32} />
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

export default EventCard;
