import { ScrollView, VStack } from 'native-base';
import React, { useEffect, useState, ReactNode } from 'react';
import { Dimensions, useWindowDimensions, StatusBar } from 'react-native';

import ScreenHeader from './ScreenHeader';

interface ScreenProps {
	heading: string;
	backButton: boolean;
	topBar: ReactNode;
	paddingBottom: number | string;
	children: ReactNode;
}

// const window = Dimensions.get('window');
// const screen = Dimensions.get('screen');

const Screen = (props: ScreenProps) => {
	const window = useWindowDimensions();

	return (
		<VStack height="full" px="10%" pt="5%" mt={`${StatusBar.currentHeight}px`} bgColor="background">
			{props.topBar}
			<ScrollView height="full" showsVerticalScrollIndicator={false}>
				<VStack
					space="15px"
					width="full"
					justifyContent="flex-start"
					alignItems="center"
					// bgColor="blue.500"
					// overflowY="scroll"
					// {...otherProps}
				>
					{}
					{props.heading || props.backButton ? (
						<ScreenHeader text={props.heading} backButton={props.backButton} />
					) : null}
					{props.children}
				</VStack>
			</ScrollView>
		</VStack>
	);
};

Screen.defaultProps = {
	heading: '',
	backButton: false,
	topBar: null,
	paddingBottom: '5%'
};

export default Screen;
