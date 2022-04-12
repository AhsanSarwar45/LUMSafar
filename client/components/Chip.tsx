import { HStack, Text } from 'native-base';
import React from 'react';

interface ChipProps {
	label: string;
	color: string;
}

const Chip = (props: ChipProps) => {
	return (
		<HStack rounded="full" width="auto" bgColor={props.color} px={4} py={2} alignSelf="flex-start" mr={1} mb={1}>
			<Text fontSize="xs" color="white">
				{props.label}
			</Text>
		</HStack>
	);
};

export default Chip;
