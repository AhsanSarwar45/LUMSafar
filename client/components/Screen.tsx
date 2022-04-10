import { ScrollView, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions, useWindowDimensions, StatusBar } from 'react-native';

import ScreenHeader from './ScreenHeader';

interface ScreenProps {
	heading: string;
	navigation: any;
	backButton: boolean;
	children: React.ReactNode;
}

// const window = Dimensions.get('window');
// const screen = Dimensions.get('screen');

const Screen = ({ heading, navigation, backButton, children }: ScreenProps) => {
	const window = useWindowDimensions();

	return (
		<ScrollView height={window.height} bgColor="background">
			<VStack
				mt={`${StatusBar.currentHeight}px`}
				px="10%"
				space="15px"
				width="full"
				justifyContent="flex-start"
				alignItems="center"
				// bgColor="blue.500"
				// overflowY="scroll"
				// {...otherProps}
			>
				{heading || backButton ? (
					<ScreenHeader text={heading} navigation={navigation} backButton={backButton} />
				) : null}
				{children}
			</VStack>
		</ScrollView>
	);
};

Screen.defaultProps = {
	heading: '',
	backButton: false,
	navigation: null
};

export default Screen;
