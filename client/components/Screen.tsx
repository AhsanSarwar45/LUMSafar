import AppLoading from 'expo-app-loading';
import { ScrollView, VStack, View } from 'native-base';
import React, { useEffect, useState, ReactNode } from 'react';
import { Dimensions, useWindowDimensions, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';

import ScreenHeader from './ScreenHeader';

interface ScreenProps {
	heading: string;
	backButton: boolean;
	onBackButton: Function;
	topBar: ReactNode;
	children: ReactNode;
	keyboardAware: boolean;
	lightScreen: boolean;
}

// const window = Dimensions.get('window');
// const screen = Dimensions.get('screen');

const Screen = (props: ScreenProps) => {
	const window = useWindowDimensions();

	const Inner = () => {
		return (
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
					<ScreenHeader
						text={props.heading}
						backButton={props.backButton}
						onBackButton={props.onBackButton}
					/>
				) : null}
				{props.children}
			</VStack>
		);
	};

	const ScrollWrapper = () => {
		return props.keyboardAware ? (
			<KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
				<Inner />
			</KeyboardAwareScrollView>
		) : (
			<ScrollView keyboardShouldPersistTaps="handled" height={window.height} showsVerticalScrollIndicator={false}>
				<Inner />
			</ScrollView>
		);
	};

	const HeavyScreenWrapper = () => {
		return props.lightScreen ? (
			<View mt={`${StatusBar.currentHeight}px`}>
				{props.topBar}
				<ScrollWrapper />
			</View>
		) : (
			<View mt={`${StatusBar.currentHeight}px`}>
				<AppLoading />
				<OptimizedHeavyScreen>
					{props.topBar}
					<ScrollWrapper />
				</OptimizedHeavyScreen>
			</View>
		);
	};

	return <HeavyScreenWrapper />;
};

Screen.defaultProps = {
	heading: '',
	backButton: false,
	onBackButton: null,
	topBar: null,
	keyboardAware: false,
	lightScreen: false
};

export default Screen;
