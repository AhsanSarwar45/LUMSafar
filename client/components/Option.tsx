import { Pressable, useTheme, Button, Text, VStack, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

interface OptionCardProps {
	onPress: Function;
	icon: any;
	label: string;
	labelSize: number;
	iconSize: number;
	width: number | string;
	height: number | string;
	py: number | string;
	px: number | string;
	mt: number | string;
}

const OptionCard = (props: OptionCardProps) => {
	const { borderRadius } = useTheme();

	return (
		<Button
			rounded={borderRadius}
			width={props.width}
			height={props.height}
			py={props.py}
			px={props.px}
			mt={props.mt}
			bgColor="primary.500"
			justifyContent="center"
			alignItems="center"
			onPress={() => props.onPress()}
		>
			<VStack alignItems="center">
				<Icon as={props.icon} size={props.iconSize} color="white" />
				<Text fontSize={props.labelSize} fontWeight={700} color="white">
					{props.label}
				</Text>
			</VStack>
		</Button>
	);
};

OptionCard.defaultProps = {
	onPress: () => {},
	labelSize: 24,
	iconSize: 16,
	py: 0,
	px: 0,
	mt: 0
};

export default OptionCard;
