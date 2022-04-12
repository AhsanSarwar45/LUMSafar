import { Icon, Pressable, useTheme } from 'native-base';
import React, { ReactNode } from 'react';
import { useWindowDimensions } from 'react-native';

import PlusIcon from '../assets/icons/PlusIcon.svg';
import SearchIcon from '../assets/icons/SearchIcon.svg';

interface CABProps {
	icon: 'Add' | 'Search';
	onPress: Function;
}

const CAB = (props: CABProps) => {
	const window = useWindowDimensions();

	const { colors } = useTheme();

	const cabSize = 15;

	return (
		<Pressable
			zIndex={10}
			position="absolute"
			width={`${window.width * (cabSize / 100)}px`}
			height={`${window.width * (cabSize / 100)}px`}
			bottom={'32px'}
			shadow={2}
			left={`${50 - cabSize / 2}%`}
			rounded="full"
			bgColor="background"
			justifyContent="center"
			alignItems="center"
			onPress={() => props.onPress()}
		>
			<Icon
				// zIndex={10}
				as={
					props.icon === 'Add' ? (
						<PlusIcon fill={colors.accent} height={40} width={40} />
					) : (
						<SearchIcon fill={colors.accent} height={40} width={40} />
					)
				}
			/>
		</Pressable>
	);
};

export default CAB;
