import { VStack, HStack, Text, Button } from 'native-base';
import React from 'react';
import moment from 'moment';

interface TimeCardProps {
	time: moment.Moment;
	label: string;
	onPress: Function;
}

export const TimeCard = (props: TimeCardProps) => {
	const Days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
	return (
		<Button
			onPress={() => props.onPress()}
			width="47.5%"
			// borderWidth={1}
			// borderColor="border.light"
			bgColor="background"
			rounded="2xl"
			shadow={2}
			px={5}
			py={3}
			space={2}
			justifyContent="flex-start"
		>
			<Text color="text.secondary">{props.label}</Text>

			<VStack>
				<HStack space={1}>
					<Text fontSize="lg">{props.time.date()}</Text>
					<Text fontSize="lg">{Days[props.time.day()]}</Text>
				</HStack>
				<HStack>
					<Text fontSize="lg">{props.time.format('hh:mm a')}</Text>
					{/* <Text fontSize="lg">{props.time.getMinutes()}</Text> */}
				</HStack>
			</VStack>
		</Button>
	);
};

TimeCard.defaultProps = {
	onPress: () => {}
};

export default TimeCard;
