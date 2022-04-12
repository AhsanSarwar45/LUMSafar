import { ScrollView, VStack } from 'native-base';
import React, { useEffect, useState, ReactNode } from 'react';
import { Dimensions, useWindowDimensions, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ScreenHeader from './ScreenHeader';

interface ScreenProps {
	heading: string;
	backButton: boolean;
	topBar: ReactNode;
	children: ReactNode;
	keyboardAware: boolean;
}

// const window = Dimensions.get('window');
// const screen = Dimensions.get('screen');

const Screen = (props: ScreenProps) => {
	const window = useWindowDimensions();

	const Inner = () => {
		return (
			<VStack pt="5%" mt={`${StatusBar.currentHeight}px`}>
				{props.topBar}
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
					{props.heading || props.backButton ? (
						<ScreenHeader text={props.heading} backButton={props.backButton} />
					) : null}
					{props.children}
				</VStack>
			</VStack>
		);
	};

	return props.keyboardAware ? (
		<KeyboardAwareScrollView>
			<Inner />
		</KeyboardAwareScrollView>
	) : (
		<ScrollView height={window.height} showsVerticalScrollIndicator={false}>
			<Inner />
		</ScrollView>
	);
};

Screen.defaultProps = {
	heading: '',
	backButton: false,
	topBar: null,
	keyboardAware: false
};

export default Screen;
