import React, { useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface SwitchProps {
	option1: string;
	option2: string;
	borderRadius: number;
	onSelectSwitch: Function;
	selectionColor: string;
}

const Switch = (props: SwitchProps) => {
	const [ getSelectionValue, setSelectionValue ] = useState(1);

	const updatedSwitchData = (value: number) => {
		setSelectionValue(value);
		props.onSelectSwitch(value);
	};

	return (
		<View>
			<View
				style={{
					height: 44,
					width: 215,
					backgroundColor: 'white',
					borderRadius: props.borderRadius ? 25 : 0,
					borderWidth: 1,
					borderColor: props.selectionColor,
					flexDirection: 'row',
					justifyContent: 'center',
					padding: 2
				}}
			>
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => updatedSwitchData(1)}
					style={{
						flex: 1,

						backgroundColor: getSelectionValue == 1 ? props.selectionColor : 'white',
						borderRadius: props.borderRadius ? 25 : 0,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Text
						style={{
							color: getSelectionValue == 1 ? 'white' : props.selectionColor
						}}
					>
						{props.option1}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => updatedSwitchData(2)}
					style={{
						flex: 1,

						backgroundColor: getSelectionValue == 2 ? props.selectionColor : 'white',
						borderRadius: props.borderRadius ? 25 : 0,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Text
						style={{
							color: getSelectionValue == 2 ? 'white' : props.selectionColor
						}}
					>
						{props.option2}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
export default Switch;
