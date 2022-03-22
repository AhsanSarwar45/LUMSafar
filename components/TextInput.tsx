import React from 'react';
import { Box, Input, Text, VStack } from 'native-base';

interface TextInputProps {
	label: string;
	placeholder: string;
}

export const TextInput = (props: TextInputProps) => {
	return (
		<VStack>
			<Text margin={0} color="rgba(255, 255, 255, 0.5)" fontWeight="bold" paddingLeft={6}>
				{props.label}
			</Text>
			<Input
				bg="rgba(255, 255, 255, 0.2)"
				// size="cs"
				variant="filled"
				borderRadius={100}
				paddingLeft={6}
				paddingTop={2}
				paddingBottom={2}
				fontWeight="bold"
				fontSize="lg"
				_focus={{
					borderWidth: 1,
					borderColor: 'rgba(255, 255, 255, 0.5)',
					color: 'white'
				}}
				// shadow="4"
				style={{ color: 'white' }}
				placeholder={props.placeholder}
				placeholderTextColor="rgba(255, 255, 255, 0.5)"
			/>
		</VStack>
	);
};
