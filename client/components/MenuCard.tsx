import { Button, HStack, Icon, Pressable, Spacer, Text, useTheme } from 'native-base';
import React, { ReactNode } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

interface MenuCardProps {
	label: string;
	icon: ReactNode;
	onPress: Function;
}

const MenuCard = (props: MenuCardProps) => {
	return (
		<Pressable width="full" onPress={() => props.onPress()}>
			<HStack
				bgColor="background"
				rounded="2xl"
				shadow={2}
				px={5}
				py={3}
				space={2}
				width="full"
				justifyContent="space-between"
			>
				<HStack space={2}>
					<Icon as={props.icon} size={6} color="black" />
					<Text fontSize="lg">{props.label}</Text>
				</HStack>

				<Icon as={<FontAwesome5 name="arrow-right" />} size={6} color="black" />
			</HStack>
		</Pressable>
	);
};

export default MenuCard;
