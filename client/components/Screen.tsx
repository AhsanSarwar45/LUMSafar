import AppLoading from 'expo-app-loading';
import { ScrollView, VStack, View, useTheme } from 'native-base';
import React, { useEffect, useState, ReactNode } from 'react';
import { Dimensions, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';

import ScreenHeader from './ScreenHeader';
import StatusBar from './StatusBar';

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
				pb="20%"
				py={props.topBar ? '0' : '20px'}
				space="15px"
				width="full"
				justifyContent="flex-start"
				alignItems="center"
				// pb="80px"

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
			<View marginTop="5%">
				<StatusBar />
				{props.topBar}
				<ScrollWrapper />
			</View>
		) : (
			<View marginTop="5%">
				<AppLoading />
				<OptimizedHeavyScreen>
					<StatusBar />
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
