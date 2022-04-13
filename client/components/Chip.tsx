import { Button, HStack, Text } from 'native-base';
import React from 'react';
import { Pressable } from 'react-native';

interface ChipProps {
	label: string;
	color: string;
	onPress: Function;
}

const Chip = (props: ChipProps) => {
	return (
		<Button
			onPress={() => props.onPress()}
			rounded="full"
			width="auto"
			bgColor={props.color}
			px={4}
			py={2}
			alignSelf="flex-start"
			mr={1}
			mb={1}
		>
			<Text fontSize="xs" color="white">
				{props.label}
			</Text>
		</Button>
	);
};

Chip.defaultProps = {
	onPress: () => {},
	color: 'primary.500'
};

export default Chip;
