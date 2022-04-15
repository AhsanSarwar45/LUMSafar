import { useTheme, View } from 'native-base';
import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

const StatusBar = () => {
	const { colors } = useTheme();

	return <ExpoStatusBar style="dark" backgroundColor={colors.background} />;
};

export default StatusBar;
