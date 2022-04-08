import { ScrollView, VStack } from 'native-base';
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
		<ScrollView height={window.height} bg="background">
			<VStack
				py="15%"
				px="10%"
				space="15px"
				width="full"
				justifyContent="flex-start"
				alignItems="center"
				// overflowY="scroll"
				{...otherProps}
			>
				<ScreenHeader text={heading} navigation={navigation} backButton={backButton} />
				{children}
			</VStack>
		</ScrollView>
	);
};

Screen.defaultProps = {
	heading: '',
	backButton: false
};

export default Screen;
