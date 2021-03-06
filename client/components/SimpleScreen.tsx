import { ScrollView, useTheme, VStack } from 'native-base';
import React, { useEffect, useState, ReactNode } from 'react';
import { Dimensions, useWindowDimensions } from 'react-native';

import ScreenHeader from './ScreenHeader';
import StatusBar from './StatusBar';

interface SimpleScreenProps {
	header: ReactNode;
	topBar: ReactNode;
	children: ReactNode;
}

// const window = Dimensions.get('window');
// const screen = Dimensions.get('screen');

const SimpleScreen = (props: SimpleScreenProps) => {
	const window = useWindowDimensions();

	return (
		<VStack marginTop="5%" height={window.height}>
			<StatusBar />
			{props.topBar}
			<ScrollView height={window.height} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
				<VStack
					px="10%"
					space="15px"
					width="full"
					justifyContent="flex-start"
					alignItems="center"
					pt="20px"
					pb="20%"
					// bgColor="blue.500"
					// overflowY="scroll"
					// {...otherProps}
				>
					{props.header}
					{props.children}
				</VStack>
			</ScrollView>
		</VStack>
	);
};

SimpleScreen.defaultProps = {
	header: null,
	topBar: null
};

export default SimpleScreen;
