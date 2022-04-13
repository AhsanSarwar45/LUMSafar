import { ScrollView, VStack } from 'native-base';
import React, { useEffect, useState, ReactNode } from 'react';
import { Dimensions, useWindowDimensions, StatusBar } from 'react-native';

import ScreenHeader from './ScreenHeader';

interface SimpleScreenProps {
	heading: string;
	backButton: boolean;
	onBackButton: Function;
	topBar: ReactNode;
	children: ReactNode;
}

// const window = Dimensions.get('window');
// const screen = Dimensions.get('screen');

const SimpleScreen = (props: SimpleScreenProps) => {
	const window = useWindowDimensions();

	return (
		<VStack height={window.height} pt="5%" mt={`${StatusBar.currentHeight}px`}>
			{props.topBar}
			<ScrollView height={window.height} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
				<VStack
					px="10%"
					space="15px"
					width="full"
					justifyContent="flex-start"
					alignItems="center"
					pb="20px"
					// bgColor="blue.500"
					// overflowY="scroll"
					// {...otherProps}
				>
					{}
					{props.heading || props.backButton ? (
						<ScreenHeader
							text={props.heading}
							backButton={props.backButton}
							onBackButton={props.onBackButton}
						/>
					) : null}
					{props.children}
				</VStack>
			</ScrollView>
		</VStack>
	);
};

SimpleScreen.defaultProps = {
	heading: '',
	backButton: false,
	onBackButton: null,
	topBar: null
};

export default SimpleScreen;
