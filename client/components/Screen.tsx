import AppLoading from 'expo-app-loading';
import { ScrollView, VStack, Text, View, useTheme } from 'native-base';
import React, { useEffect, useState, ReactNode } from 'react';
import { Dimensions, useWindowDimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen';

import ScreenHeader from './ScreenHeader';
import StatusBar from './StatusBar';

interface ScreenProps {
	header: ReactNode;
	topBar: ReactNode;
	children: ReactNode;
	scrollType: 'none' | 'scroll' | 'keyboardAware';
	stacked: boolean;
	lightScreen: boolean;
}

// const window = Dimensions.get('window');
// const screen = Dimensions.get('screen');

const Screen = (props: ScreenProps) => {
	const window = useWindowDimensions();

	const Inner = () => {
		return props.stacked ? (
			<VStack
				px="8%"
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
				{props.header}
				{props.children}
			</VStack>
		) : (
			<View px="8%" pb="20%" py={props.topBar ? '0' : '20px'} width="full">
				{props.header}
				{props.children}
			</View>
		);
	};

	const ScrollWrapper = () => {
		return props.scrollType === 'none' ? (
			<Inner />
		) : props.scrollType === 'scroll' ? (
			<ScrollView keyboardShouldPersistTaps="handled" height={window.height} showsVerticalScrollIndicator={false}>
				<Inner />
			</ScrollView>
		) : (
			<KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
				<Inner />
			</KeyboardAwareScrollView>
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
	header: null,
	stacked: true,
	topBar: null,
	keyboardAware: false,
	lightScreen: false,
	scrollType: 'scroll'
};

export default Screen;
