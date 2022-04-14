import { useTheme, View } from 'native-base';
import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

const StatusBar = () => {
	const { colors } = useTheme();

	return <ExpoStatusBar style="light" backgroundColor={colors.primary[700]} />;
};

export default StatusBar;
