import { VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions, useWindowDimensions } from 'react-native';

import ScreenHeader from './ScreenHeader';

interface ScreenProps {
	heading: string;
	navigation: any;
	backButton: boolean;
	children: React.ReactNode;
}

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const Screen = ({ heading, navigation, backButton, children, ...otherProps }: ScreenProps) => {
	const window = useWindowDimensions();

	return (
		<VStack
			py="15%"
			px="10%"
			bgColor="white"
			space="15px"
			width="full"
			height={window.height}
			justifyContent="flex-start"
			alignItems="center"
			{...otherProps}
		>
			<ScreenHeader text={heading} navigation={navigation} backButton={backButton} />
			{children}
		</VStack>
	);
};

Screen.defaultProps = {
	heading: '',
	backButton: false
};

export default Screen;
